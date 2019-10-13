import React from "react";

class AppContainer extends React.Component<any, any> {

  public render(): JSX.Element {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

  
}

export default AppContainer;
