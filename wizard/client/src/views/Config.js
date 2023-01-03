import React, { useEffect, useState } from "react";
import history from "../globalHistory";
import "./Config.css";

const Config = props => {
  const [data, setData] = useState("");
  const loadData = async () => {
    let path = props.location.data ? props.location.data.deployment : "";
    let url = "/api/v1/config/" + path.toLowerCase();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(props.location.data)
    });
    const text = await response.text();
    setData(text.trim());
  };

  useEffect(() => {
    loadData();
  }, []);

  const createObjectURL = data => {
    var blob = new Blob([data]);
    if (window.webkitURL && window.webkitURL.createObjectURL) {
      console.log("here");
      return window.webkitURL.createObjectURL(blob);
    } else if (window.URL && window.URL.createObjectURL) {
      console.log("or here");
      return window.URL.createObjectURL(blob);
    } else {
      return null;
    }
  };
  const downloadClick = () => {
    let url = createObjectURL(data);
    let a = document.createElement("a");
    a.href = url;
    a.download = getFileName();
    a.click();
  };

  const getFileName = () => {
    if (!props.location.data) return null;
    const { deployment } = props.location.data;
    switch (deployment) {
      case "K8s":
        return "k8s.yaml";
      case "Knative":
        return "knative.yaml";
      case "Openshift":
        return "openshift.sh";
      case "Istio":
        return "istio.yaml";
      case "Helm":
        return "helm.sh";
    }
    return "download.txt";
  };

  const generateInstruction = () => {
    if (!props.location.data) return null;
    const { deployment } = props.location.data;
    switch (deployment) {
      case "K8s":
        return k8sInstruction();
      case "Openshift":
        return openshiftInstruction();
    }
    return null;
  };

  const openshiftInstruction = () => {
    return (
      <div className="ui segment">
        <p>Either download the content as a file or copy the script.</p>
        <pre className="ui segment">chmod +x openshift.sh</pre>
        <pre className="ui segment">./openshift.sh</pre>
      </div>
    );
  }

  const k8sInstruction = () => {
    return (
      <div className="ui segment">
        <p>Either download the content as a file or copy the yaml.</p>
        <pre className="ui segment">kubectl apply -f k8s.yaml</pre>
      </div>
    );
  };

  const generateBackButton = () => {
    return (
      <button className="ui inverted primary button" onClick={() => history.push("/")}>
        Go Back
      </button>
    );
  };

  return (
    <div className="ui container" style={{ padding: "20px" }}>
      <h1>Generate command for deploying Bee-Travels 🐝</h1>
      {data ? (
        <>
          {generateInstruction()}
          <button
            className="ui inverted primary button"
            onClick={() => {
              navigator.clipboard.writeText(data);
            }}
          >
            Copy to Clipboard
          </button>
          <button
            className="ui inverted primary button"
            onClick={downloadClick}
          >
            Download
          </button>
          <pre className="ui segment">{data}</pre>
        </>
      ) : (
        generateBackButton()
      )}
    </div>
  );
};

export default Config;
