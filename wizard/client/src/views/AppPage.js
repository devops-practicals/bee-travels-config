import React, { useState, useEffect } from "react";
import Choice from "../component/Choice";
import "./Choice.css";
import history from "../globalHistory";

const deployments = [
  { value: "K8s", id: "k8s", disabled: false },
  { value: "Openshift", id: "openshift", disabled: false },
  { value: "Openshift-s390x", id: "zos", disabled: false },
  { value: "Knative", id: "knative", disabled: true },
  { value: "Istio", id: "istio", disabled: true },
  { value: "Helm", id: "helm", disabled: true },
];

const AppPage = () => {
  const [deployment, setDeployment] = useState(null);
  const [version, setVersion] = useState(null);
  const [loadVersion, setLoadVersion] = useState(null);
  const [destinationLanguage, setDestinationLanguage] = useState(null);
  const [hotelLanguage, setHotelLanguage] = useState(null);
  const [currencyExchangeLanguage, setCurrencyExchangeLanguage] = useState(
    null
  );
  const [carRentalLanguage, setCarRentalLanguage] = useState(null);
  const [flightLanguage, setFlightLanguage] = useState(null);
  const [cartLanguage, setCartLanguage] = useState(null);
  const [paymentLanguage, setPaymentLanguage] = useState(null);
  const [emailLanguage, setEmailLanguage] = useState(null);
  const [checkoutLanguage, setCheckoutLanguage] = useState(null);
  const [messageLanguage, setMessageLanguage] = useState(null);
  const [ingress, setIngress] = useState("");
  const [ingressSecret, setIngressSecret] = useState("");

  const loadVersions = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/bee-travels/config/master/version.json"
    );
    const json = await response.json();
    setLoadVersion(json);
  };

  useEffect(() => {
    loadVersions();
  }, []);

  const getVersionsList = (version) => {
    if (!version) {
      return [];
    }

    return Object.keys(version).map((v, i) => {
      return { value: v, disabled: !version[v]["enabled"] };
    });
  };

  const getLanguageList = (version, selectedVersion) => {
    return Object.keys(version[selectedVersion])
      .filter((v) => v !== "enabled")
      .map((v, i) => {
        return { value: v, disabled: !version[selectedVersion][v]["enabled"] };
      });
  };

  const onDeployementSelected = (value) => {
    setDeployment(value);
  };

  const onVersionSelected = (value) => {
    setVersion(value);
  };

  const onDestinationLanguageSelected = (value) => {
    setDestinationLanguage(value);
  };

  const onHotelLanguageSelected = (value) => {
    setHotelLanguage(value);
  };

  const onCurrencyExchangeLanguageSelected = (value) => {
    setCurrencyExchangeLanguage(value);
  };

  const onFlightLanguageSelected = (value) => {
    setFlightLanguage(value);
  };

  const onPaymentLanguageSelected = (value) => {
    setPaymentLanguage(value);
  };

  const onCartLanguageSelected = (value) => {
    setCartLanguage(value);
  };

  const onCheckoutLanguageSelected = (value) => {
    setCheckoutLanguage(value);
  };

  const onEmailLanguageSelected = (value) => {
    setEmailLanguage(value);
  };

  const onCarRentalLanguageSelected = (value) => {
    setCarRentalLanguage(value);
  };

  const onMessageLanguageSelected = (value) => {
    setMessageLanguage(value);
  };

  const versionMap = {
    v1: [
      {
        service: "Destination",
        required: true,
        dependsOn: [],
        onChange: onDestinationLanguageSelected,
      },
      {
        service: "Hotel",
        required: false,
        dependsOn: [],
        onChange: onHotelLanguageSelected,
      },
      {
        service: "CurrencyExchange",
        required: false,
        dependsOn: [],
        onChange: onCurrencyExchangeLanguageSelected,
      },
      {
        service: "CarRental",
        required: false,
        dependsOn: [],
        onChange: onCarRentalLanguageSelected,
      },
    ],
    v2: [
      {
        service: "Checkout",
        required: false,
        dependsOn: [],
        onChange: onCheckoutLanguageSelected,
      },
      {
        service: "Payment",
        required: false,
        dependsOn: ["Checkout"],
        onChange: onPaymentLanguageSelected,
      },
      {
        service: "Email",
        required: false,
        dependsOn: ["Checkout"],
        onChange: onEmailLanguageSelected,
      },
    ],
    v3: [
      {
        service: "Flight",
        required: false,
        dependsOn: [],
        onChange: onFlightLanguageSelected,
      },
      {
        service: "Cart",
        required: false,
        dependsOn: [],
        onChange: onCartLanguageSelected,
      },
      {
        service: "Message",
        required: false,
        dependsOn: ["Checkout"],
        onChange: onMessageLanguageSelected,
      },
    ],
  };

  const renderV1 = () => {
    return (
      <>
        <h2>Services</h2>
        <h4>NOTE: UI will automatically be deployed</h4>
        {versionMap.v1.map((v, i) => (
          <Choice
            key={i}
            label={v.service}
            required={v.required}
            data={getLanguageList(loadVersion, "v1")}
            onChange={v.onChange}
          />
        ))}
      </>
    );
  };

  const renderV2 = () => {
    return (
      <>
        {versionMap.v2.map((v, i) => (
          <Choice
            key={i}
            label={v.service}
            required={v.required}
            data={getLanguageList(loadVersion, "v2")}
            onChange={v.onChange}
          />
        ))}
      </>
    );
  };

  const renderV3 = () => {
    return (
      <>
        {versionMap.v3.map((v, i) => (
          <Choice
            key={i}
            label={v.service}
            required={v.required}
            data={getLanguageList(loadVersion, "v3")}
            onChange={v.onChange}
          />
        ))}
      </>
    );
  };

  const getLanguageForService = (service) => {
    switch (service) {
      case "Destination":
        return destinationLanguage;
      case "Hotel":
        return hotelLanguage;
      case "CurrencyExchange":
        return currencyExchangeLanguage;
      case "CarRental":
        return carRentalLanguage;
      case "Payment":
        return paymentLanguage;
      case "Cart":
        return carRentalLanguage;
      case "Checkout":
        return checkoutLanguage;
      case "Email":
        return emailLanguage;
      case "Flight":
        return flightLanguage;
      case "Message":
        return messageLanguage;
    }
  };
  //{ service: "Destination", required: true, dependsOn: [], onChange: onDestinationLanguageSelected },
  const handleClick = () => {
    let services = [{ service: "ui", tag: loadVersion[version]["NodeJS"].tag }];
    if (version > "") {
      versionMap["v1"].forEach((v) => {
        if (getLanguageForService(v.service)) {
          services.push({
            service: v.service.toLowerCase(),
            tag: loadVersion[version][getLanguageForService(v.service)].tag,
          });
        }
      });
    }
    if (version > "v1") {
      versionMap["v2"].forEach((v) => {
        if (getLanguageForService(v.service)) {
          services.push({
            service: v.service.toLowerCase(),
            tag: loadVersion[version][getLanguageForService(v.service)].tag,
          });
        }
      });
    }
    if (version > "v2") {
      versionMap["v3"].forEach((v) => {
        if (getLanguageForService(v.service)) {
          services.push({
            service: v.service.toLowerCase(),
            tag: loadVersion[version][getLanguageForService(v.service)].tag,
          });
        }
      });
    }

    let data = {
      deployment: deployment,
      version: version,
    };

    for (var i = 0; i < services.length; i++) {
      data[services[i].service] = services[i];
    }

    console.log(data);

    history.push({
      pathname: "/config",
      data: data,
    });
  };

  const notNull = (data) => {
    return data !== null && data !== undefined;
  };

  const buttonCheck = () => {
    let v1ServicesSelected = notNull(destinationLanguage);
    let v2ServicesSelected = v1ServicesSelected;
    let v3ServicesSelected = v2ServicesSelected;
    if (version === "v1") {
      return !v1ServicesSelected;
    } else if (version === "v2") {
      return !v2ServicesSelected;
    } else {
      return !v3ServicesSelected;
    }
  };

  const renderSubmitButton = () => {
    return (
      <button
        className="ui inverted primary button"
        onClick={handleClick}
        disabled={buttonCheck()}
      >
        Deploy
      </button>
    );
  };

  const renderServices = (version) => {
    return (
      <>
        {version > "" ? renderV1() : null}
        {version > "v1" ? renderV2() : null}
        {version > "v2" ? renderV3() : null}
        {version > "" ? renderSubmitButton() : null}
      </>
    );
  };

  const renderVersions = (deployment) => {
    return deployment ? (
      <Choice
        label="Version"
        data={getVersionsList(loadVersion)}
        onChange={onVersionSelected}
      />
    ) : null;
  };

  const renderIngressTextBox = (deployment) => {
    if (
      deployment === "k8s" ||
      deployment === "knative" ||
      deployment === "helm"
    ) {
      return (
        <div className="ui segment">
          <h2>If Deployed on Kubernetes cluster with Ingress Enabled</h2>
          <div className="ui fluid input">
            <input
              type="text"
              placeholder="Kubernetes Ingress"
              value={ingress}
              onChange={(e) => setIngress(e.target.value)}
            />
          </div>
          <div style={{ margin: "4px" }}></div>
          <div className="ui fluid input">
            <input
              type="text"
              placeholder="Kubernetes Ingress Secret"
              value={ingressSecret}
              onChange={(e) => setIngressSecret(e.target.value)}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="ui header">Bee Travels Deployment Wizard</h1>
      <Choice
        label="Deployment"
        data={deployments}
        onChange={onDeployementSelected}
      />
      {renderIngressTextBox(deployment)}
      {renderVersions(deployment)}
      {renderServices(version)}
    </div>
  );
};

export default AppPage;
