import React from 'react'
import axios from 'axios';
import { injectStripe } from 'react-stripe-elements';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { usdDonationPropTypes } from '../../proptypes/donate-proptypes'
import CtaButton from '../CtaButton'
import FiatForm from './FiatForm'
import SuccessDonation from './SuccessDonation'
import FailedDonation from './FailedDonation'


class StripeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      loaded: false,
      failed: false,
      error: '',
      donationAmount: "$102.00",
      name: '',
      email: '',
      canMakePayment: false,
      notes: '',
      anonymous: false,
      donationOptions: [
        { "amount": "0.06", "selected": false },
        { "amount": "0.15", "selected": false },
        { "amount": "0.30", "selected": false },
        { "amount": "0.60", "selected": true },
        { "amount": "3.00", "selected": false },
        { "amount": "6.00", "selected": false },
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.donatePerMileOptionClicked = this.donatePerMileOptionClicked.bind(this)
    this.goBackToForm = this.goBackToForm.bind(this)
  }

  donatePerMileOptionClicked(e, donationObject, index) {
    e.preventDefault();
    // Set all selected attributes to false
    let newDonationOptions = this.state.donationOptions.map(obj => { obj.selected = false; return obj });
    newDonationOptions[index].selected = true;
    const donationAmountString = (Math.round(donationObject.amount * 170)).toLocaleString();
    this.setState({
      donationAmount: `$${donationAmountString}.00`,
      donationOptions: newDonationOptions,
    });
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (event.target.name === 'donationAmount') { // Reset donatePerMileOptions if donation amount manually changed
      let newDonationOptions = this.state.donationOptions.map(obj => { obj.selected = false; return obj });
      this.setState({
        [event.target.name]: value,
        donationOptions: newDonationOptions,
      });
    } else { // Not donate amount input, so set value normally.
      this.setState({ [event.target.name]: value });
    }
  }

  handleSubmit = async (event) => {
    this.setState({ submitted: true });
    const intDonationAmount = this.state.donationAmount.slice(1).replace(',', ''); // Remove $ from string
    const donationAmount = parseInt(intDonationAmount * 100); // Stripe takes amounts coverted to pennies
    // We don't want to let default form submission happen here, which would refresh the page.
    event.preventDefault();
    if (this.props.stripe) {
      try {
        const payload = await this.props.stripe.createToken({ name: this.state.name })
        console.log('[token]', payload);
        if (payload.error) throw new Error(payload.error.message);
        await this.submitStripeTokenToBackend(payload.token.id, donationAmount, this.state.email);
        this.setState({ loaded: true });
      } catch (error) {
        console.log('Error in handleSubmit: ', error.message);
        this.setState({ loaded: true, failed: true, error: error.message });
      }
      window.scrollTo(0,0); // Scroll to top after submission
    } else {
      console.log("Stripe.js hasn't loaded yet or stripe token creation failure.");
      this.setState({ loaded: true, failed: true });
    }
  };

  submitStripeTokenToBackend = async (tokenId, donationAmount, email) => {
    const currEnvironment = (process.env.NODE_ENV === 'production' ? 'production' : 'development');
    try {
      const stripeData = await axios.post(process.env.SERVER_CHARGES_URL, { // POST to our backend server with the token and charge details  crossDomain:true,
        tokenId,
        environment: currEnvironment,
        charge: {
          amount: donationAmount,
          currency: 'USD',
          receipt_email: email,
        },
      });
      console.log('stripeData: ', stripeData);
      return await this.submitDonationToGoogleSheet();
    } catch (error) {
      console.log('Error in submitStripeTokenToBackend: ', error.message);
      throw new Error(error.message);
    }
  }

  submitDonationToGoogleSheet = async () => {
    try {
      const sheetData = await axios.post(process.env.SERVER_UPDATE_SHEET_URL, {
        date: new Date().toLocaleString('en-US'),
        name: this.state.name,
        email: this.state.email,
        donationAmount: this.state.donationAmount,
        anonymous: this.state.anonymous,
        notes: this.state.notes,
        stripeMode: this.props.stripe._keyMode,
      });
      return sheetData;
    } catch (error) {
      console.log('Error in submitDonationToGoogleSheet: ', error.message);
      throw new Error(error.message);
    }
  }

  goBackToForm() {
    this.setState({ submitted: false, loaded: false, failed: false });
  };


  render = () => {
    if (!this.state.loaded) {
      return (
          <FiatForm 
            usdDonationContent={this.props.usdDonation}
            handleSubmit={this.handleSubmit}
            donatePerMileOptionClicked={this.donatePerMileOptionClicked}
            donationOptions={this.state.donationOptions}
            donationAmount={this.state.donationAmount}
            name={this.state.name}
            email={this.state.email}
            donationNotes={this.state.notes}
            anonymous={this.state.anonymous}
            handleChange={this.handleChange}
            isSubmitted={this.state.submitted}
          />
      )
    } else if (this.state.submitted && this.state.loaded && !this.state.failed) {
      return (
        <SuccessDonation donationAmount={this.state.donationAmount} />
      )
    } else if (this.state.submitted && this.state.failed) {
      return (
        <FailedDonation goBackToForm={this.goBackToForm} errorMessage={this.state.error} />
      )
    }

    return
  }
}

StripeFormComponent.propTypes = {
  usdDonation: usdDonationPropTypes,
}

const DonateFiatFormComponent = injectStripe(StripeFormComponent);

export default DonateFiatFormComponent;
