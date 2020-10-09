import React, { PropTypes } from "react";
import { Component } from "react";

import logoMuted from "../../images/logo-muted.svg";

import { contactInformation } from "./_invoice-preview-header";

export default class InvoicePreviewFooter extends Component {
  static propTypes = {
    invoice: PropTypes.object,
  };
  render() {
    const { invoice } = this.props;

    const account = `Account: ${
      invoice.international
        ? contactInformation.accountUSD
        : contactInformation.accountCAD
    }`;

    const swiftBIC = invoice.international ? (
      <div>Swift BIC: ROYCCAT2</div>
    ) : null;

    return (
      <div>
        <section className="py-10" style={{ minHeight: "220px" }}>
          {invoice.international && (
            <p className="mb-6">
              <em>All prices in USD</em>
            </p>
          )}
          <p className="mb-6">
            Please send payment within 21 days of receiving this invoice. We
            accept payment via wire transfer or cheque.
          </p>
          <p className="mb-6">
            If you have any questions, feel free to contact us at{" "}
            <a
              className="text-accent"
              href={`mailto:${contactInformation.email}`}
            >
              {contactInformation.email}
            </a>
          </p>
          <p>
            Sincerely, <br /> The Volume7 team
          </p>
        </section>

        <hr className="h-0 block w-full border-0 border-t-2 border-gray-200" />

        <footer className="py-10">
          <div className="flex -mx-4">
            <div className="w-1/4 px-4">
              <p className="text-gray-500">
                GST: {contactInformation.GST}
                <br />
                QST: {contactInformation.QST}
              </p>
            </div>
            <div className="w-1/4 px-4">
              <p className="text-gray-500">
                Institution: {contactInformation.institution}
                <br />
                Transit: {contactInformation.transit}
              </p>
            </div>
            <div className="w-1/4 px-4">
              <p className="text-gray-500">
                {account}
                {swiftBIC}
              </p>
            </div>
            <div className="w-1/4 px-4 text-right">
              <a href="http://volume7.io">
                <img
                  className="inline-block"
                  src={logoMuted}
                  style={{ width: "46px" }}
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
