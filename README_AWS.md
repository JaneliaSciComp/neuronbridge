### AWS User Pool Setup

- Define authorized, un-authorized and admin roles
- Create the cognito user pool for authentication and authorization
    - log into https://console.aws.amazon.com/cognito/users
    - Click "Create a user pool"
    - Name the user pool
    - Click "Review defaults"
    - Name
    - Attributes
    - Policies
    - MFA & Verifications
    - Message Customizations
        - Click "Next step" to select the defaults
    - Tags
       - Click "Next step" to skip
    - Devices
        - Click "Next step" to skip
    - App Clients
        -
    - Triggers
        - Click "Next step" to skip
    - Review
        - Click "Create Pool"
    - under "General Settings" take note of the "Pool Id"
    - under "App clients" take note of the "App client id"
- Create groups
    - Under users & groups, select the Groups tab and click "Create Group"
    - Add an "authorized users group
    - Add an "admin" group
        - for this one, set the precendece to 0

- create the federated identity pool
    - go to https://console.aws.amazon.com/cognito/federated/
    - click on "Create new identity pool"
    - add an identity pool name
    - Expand the "Authentication Providers" section
    - In the Cognito tab add the "User Pool ID" and "App client Id" recorded from the cognito user pool creation
    - Add other providers by following the instructions for each one.
    - click "Create Pool"
    - attach roles to the federated identity pool
- Add the admin role to the identity pool
    - Click "Edit identity pool" at the top of the identity pool dashboard.
    - Go to the "Cognito Tab" in the "Authentication providers" section of the identity pool
    - Under the "Authenticated role selection" heading select "Choose role with rules" from the dropdown.
    - Set the following:
        - Claim: "cognito:groups"
        - Value: "contains"
        - Role: "neuronbridge-admin"
    - Click "save changes" at the bottom of the page.
- update access permissions for the Authorized and Admin roles
- Attach roles to the correct user groups
- Add cognito & oauth information to src/config.js
    - in your clone of the repo open ```src/config.js```
    - in the ```export default``` code block add the following:

   ``` JSON
   cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "<copied from 'Pool id' on the General settings section of the user pool settings>",
      APP_CLIENT_ID: "<copied from app clients section of the user pool settings>",
      IDENTITY_POOL_ID: "<copied from Identity Pool ID on the Federated Identity Editing page "
   },
   oauth: {
     DOMAIN: "<copied from Domain name page in user pool settings",
     SCOPE: ["email", "openid", "profile"],
     REDIRECT_SIGN_IN: window.location.origin,
     REDIRECT_SIGN_OUT: window.location.origin
   },
   ```

