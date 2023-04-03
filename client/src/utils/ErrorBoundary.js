// this class is used to catch errors in the app and display a message to the user
// it uses material-ui alerts to display the error message

import React, { Component } from "react";
import { Alert, AlertTitle } from '@mui/material';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: "" };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ errorInfo: errorInfo });
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Something went wrong — <strong>please try again later</strong>
                    {this.state.errorInfo && <p>{this.state.errorInfo}</p>}
                </Alert>
        );
        }
    
        return this.props.children;
    }
}
    
export default ErrorBoundary;