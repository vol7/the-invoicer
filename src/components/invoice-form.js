import React, { PropTypes } from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormItemList from "./form-item-list";
import FormInput from "./form-input";

import { invoiceActions } from "../redux/modules/invoice";

import invoicerLogo from "../../images/invoicer-logo.svg";

import { initialState } from "../redux/modules/invoice";

class InvoiceForm extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired,
    locationChange: PropTypes.func.isRequired,
    taxesChange: PropTypes.func.isRequired,
    invoice: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onTaxesChange = this.onTaxesChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  onChange(event) {
    this.props.fieldChange({ [event.target.name]: event.target.value });
  }

  onLocationChange() {
    this.props.locationChange();
  }

  onTaxesChange() {
    this.props.taxesChange();
  }

  reset() {
    Object.keys(initialState).map(
      function (key) {
        this.props.fieldChange({ [key]: initialState[key] });
      }.bind(this)
    );
  }

  print() {
    window.print();
  }

  render() {
    const { invoice } = this.props;

    return (
      <div>
        <aside
          className="sidebar bg-gray-900 sticky top-0 overflow-y-auto h-screen p-8 print:hidden"
          style={{ width: 320 }}
        >
          <h1 className="flex items-center mb-6 text-2xl font-bold text-white">
            <img className="mr-4" src={invoicerLogo} width="24" />
            <span>The Invoicer</span>
          </h1>
          <div className="flex -mx-2">
            <div className="w-1/3 px-2">
              <FormInput
                type="number"
                name="number"
                value={invoice.number}
                label="No."
              />
            </div>
            <div className="w-2/3 px-2">
              <FormInput
                type="text"
                name="date"
                value={invoice.date}
                label="Date"
              />
            </div>
          </div>

          <div className="mb-4">
            <FormInput
              type="text"
              name="client"
              value={invoice.client}
              label="Client"
            />
          </div>

          <FormInput
            type="text"
            name="projectName"
            value={invoice.projectName}
            label="Project"
          />

          <hr className="my-6 border-white border-opacity-25" />

          <FormItemList />

          <FormInput
            type="number"
            name="paid"
            value={invoice.paid}
            label="Paid"
          />

          {invoice.paid ? (
            <FormInput
              type="number"
              name="paymentDue"
              value={invoice.paymentDue}
              label="Payment Due"
            />
          ) : null}

          <div className="mb-2">
            <label
              className="flex items-center cursor-pointer"
              htmlFor="client-location"
            >
              <input
                className="focus:outline-none"
                type="checkbox"
                name="location"
                id="client-location"
                value="International"
                checked={invoice.international ? "checked" : ""}
                onChange={this.onLocationChange}
              ></input>

              <span className="text-white ml-3">International client</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center cursor-pointer" htmlFor="taxes">
              <input
                className="focus:outline-none"
                type="checkbox"
                name="taxes"
                id="taxes"
                value="Taxes"
                checked={invoice.taxes ? "checked" : ""}
                onChange={this.onTaxesChange}
              ></input>

              <span className="text-white ml-3">Taxes</span>
            </label>
          </div>

          <div className="grid space-y-2">
            <button
              type="button"
              onClick={this.print}
              className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded focus:outline-none"
            >
              Save to PDF
            </button>
            <button
              type="button"
              onClick={this.reset}
              className="bg-transparent text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Reset form
            </button>
          </div>
        </aside>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invoice: state.invoice,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fieldChange: invoiceActions.fieldChange,
      locationChange: invoiceActions.locationChange,
      taxesChange: invoiceActions.taxesChange,
      uploadInvoice: invoiceActions.uploadInvoice,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
