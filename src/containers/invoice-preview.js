import React, { Component } from "react";
import { PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import Money from "../components/money";
import InvoicePreviewFooter from "../components/_invoice-preview-footer";
import InvoicePreviewHeader from "../components/_invoice-preview-header";

class InvoicePreview extends Component {
  static propTypes = {
    invoice: PropTypes.object,
  };

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  render() {
    const { invoice } = this.props;

    const subTotal = () => {
      if (invoice.items && invoice.items.length) {
        return invoice.items
          .map((item) => parseFloat(item.price) || 0)
          .reduce((a, b) => a + b);
      } else {
        return 0;
      }
    };

    const tvq = () => subTotal() * TVQ;
    const tps = () => subTotal() * TPS;
    const total = () => subTotal() + (invoice.taxes ? tps() + tvq() : 0);
    const balance = () => total() - invoice.paid;

    const subtotalDisplay = invoice.taxes ? (
      <div className="w-1/4 px-4">
        <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
          Subtotal
        </h4>
        <strong>
          <Money amount={subTotal()} />
        </strong>
      </div>
    ) : null;

    const tpsDisplay = invoice.taxes ? (
      <div className="w-1/4 px-4">
        <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
          TPS
        </h4>
        <strong>
          <Money amount={tps()} />
        </strong>
      </div>
    ) : null;

    const tvqDisplay = invoice.taxes ? (
      <div className="w-1/4 px-4">
        <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
          TVQ
        </h4>
        <strong>
          <Money amount={tvq()} />
        </strong>
      </div>
    ) : null;

    const totalTextClasses = classNames({
      "text-accent": !invoice.paid && !invoice.paymentDue,
    });

    const totalDisplay = (
      <div className={"w-1/4 px-4"}>
        <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
          Total
        </h4>
        <strong className={totalTextClasses}>
          <Money amount={total()} />
        </strong>
      </div>
    );

    const paidTextClasses = classNames({
      "text-accent": invoice.paid && !invoice.paymentDue,
    });

    const paidDisplay = invoice.paid ? (
      <div className="w-1/4 px-4">
        <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
          Paid
        </h4>
        <strong className={paidTextClasses}>
          <Money amount={invoice.paid} />
        </strong>
      </div>
    ) : null;

    const balanceDisplay = invoice.paid ? (
      <div className="w-1/4 px-4">
        <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
          Balance
        </h4>
        <strong>
          <Money amount={balance()} />
        </strong>
      </div>
    ) : null;

    const paymentDueClasses = classNames({
      "text-accent": invoice.paid && invoice.paymentDue,
    });

    const paymentDueDisplay =
      invoice.paymentDue && invoice.paid ? (
        <div className="w-1/4 px-4">
          <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
            Payment due
          </h4>
          <strong className={paymentDueClasses}>
            <Money amount={invoice.paymentDue} />
          </strong>
        </div>
      ) : null;

    return (
      <main className="main p-20 w-full mx-auto" style={{ maxWidth: 1060 }}>
        <InvoicePreviewHeader />
        <section className="py-10">
          <div className="flex -mx-4">
            <div className="w-1/4 px-4">
              <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
                Invoice
              </h4>
              <strong>{invoice.number}</strong>
            </div>

            <div className="w-1/4 px-4">
              <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
                Client
              </h4>
              <strong>{invoice.client}</strong>
            </div>

            <div className="w-1/4 px-4">
              <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
                Project
              </h4>
              <strong>{invoice.projectName}</strong>
            </div>

            <div className="w-1/4 px-4 text-right">
              <h4 className="text-sm uppercase tracking-wider mb-1 text-gray-600">
                Date
              </h4>
              <strong>{invoice.date}</strong>
            </div>
          </div>
        </section>

        <hr className="h-0 block w-full border-0 border-t-2 border-gray-200" />

        <section className="py-10 space-y-6" style={{ minHeight: "220px" }}>
          {this.mapObject(invoice.items, function (key, value) {
            return (
              <div className="flex -mx-4" key={key}>
                <div className="w-2/3 px-4">
                  <strong>{invoice.items[key].name || "Item"}</strong>
                  <p>{invoice.items[key].description || "Description"}</p>
                </div>
                <div className="w-1/3 px-4 text-right">
                  <strong>
                    <Money amount={invoice.items[key].price} />
                  </strong>
                </div>
              </div>
            );
          })}
        </section>

        <hr className="h-0 block w-full border-0 border-t-2 border-gray-200" />

        <section className="py-10">
          <div className="flex -mx-4 items-center">
            {subtotalDisplay}
            {tpsDisplay}
            {tvqDisplay}
            {totalDisplay}
          </div>
        </section>
        <section
          className={classNames({
            hidden: !paidDisplay && !balanceDisplay && !paymentDueDisplay,
            section: true,
          })}
        >
          <div className="flex -mx-4 items-center">
            {paidDisplay}
            {balanceDisplay}
            {paymentDueDisplay}
          </div>
        </section>

        <hr className="h-0 block w-full border-0 border-t-2 border-gray-200" />

        <InvoicePreviewFooter invoice={invoice} />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    invoice: state.invoice,
  };
}

export default connect(mapStateToProps)(InvoicePreview);
