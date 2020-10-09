import React, { Component } from "react";

import logo from "../../images/logo.svg";

export const contactInformation = {
  name: "Volume7 Inc.",
  adress: "309-445 Viger Ouest Montreal, QC H2Z 2B8 Canada",
  email: "hello@volume7.io",
  website: "volume7.io",
  institution: "003",
  transit: "07671",
  accountUSD: "4002648",
  accountCAD: "1009620",
  GST: "84263 1830",
  QST: "1220456036",
};

export default class InvoicePreviewHeader extends Component {
  render() {
    return (
      <header className="mb-6">
        <div className="flex -mx-4 items-center">
          <div className="w-1/4 px-4">
            <img src={logo} style={{ width: "46px" }} />
          </div>
          <div className="w-1/4 px-4">
            <strong>{contactInformation.name}</strong>
          </div>
          <div className="w-1/2 px-4 text-right">
            <strong>{contactInformation.adress}</strong>
          </div>
        </div>
      </header>
    );
  }
}
