import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUIComponent: React.FC = () => {
    return <SwaggerUI url={process.env.REACT_APP_API_URL + "/api-docs-json"} />;
};

export default SwaggerUIComponent;
