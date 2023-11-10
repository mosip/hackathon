# hackathon
Repository where all hackathon problem statements of MOSIP 
TOTP Implementation for MOSIP

1. INTROUDCTION
2. MOTIVATION
3. CURRENT ARCHITECTURE
3.1 OTP Manager
3.2 OTP Provider 
3.3 Notification Service
4. REQUIREMENTS & SOLUTION APPROACH
4.1 Requirement 
4.2 Development Environment
4.3 Deployment , Testing & Submission
5. Deliverables
6. APPENDIX
461 Reference Repo & URLS
MOSIP github   https://github.com/mosip/
1. INTROUDCTION
MOSIP Platform today supports few authentication mechanisms such as biometric and OTP. we would like to extend to Time-based-one-time Password, shortly referred to as TOTP

RFC 6238 (RFC 6238: TOTP: Time-Based One-Time Password Algorithm )

Key Information

Value

Complexity Level

Medium

Team Size

3-4

Timeline

Not more than 45 days

Tech Stack

Java/Springboot/REST/JSON

RFC 6238,RFC 4226,RFC 2104

MOSIP Commons Target

1.2.0-rc2

 

2. MOTIVATION
There are many countries where internet data based solutions are not viable hence OTP over email is not feasible. Currently we need to deliver  OTP over SMS which is also expensive in many parts of the world.

Another challenge being faced in-time delivery of OTP. In case of SMS or email since we rely on the third party service provider, there are varying delays in delivery which is leading to time-outs

Lastly when we are using USSD channel for MOSIP we face the modal dialog problem as described below

We start the USSD Dialog. An user action triggers OTP delivery over SMS

User’s phone receives the otp. However since the phone is currently displaying the modal USSD dialog it wont allow the user to swtich to OTP view hence he cant see and the supply the OTP to USSD prompt.

This has become a critical challenge

We also would like to support third party authenticators such as Google Authenticator which support IETF RCF 6238.

We need a solution which addresses the above issues. We believe TOTP is a right choice for this.

3. CURRENT ARCHITECTURE
MOSIP has Implemented core services in a repo named ‘commons'. 

Following are some of the key services relevant to this task.

3.1 OTP Manager
This Service provides REST APIs as well as can be consumed as a SDK. Typically other services in MOSIP consume APIs from this service to generate OTP and use Notification Services to deliver them over preferred channels after converting to configured templates as per the use-case requirement

This also provides OTP verification service along with OTP minimum/maximum lenght, TTL, One time use features.

Only numeric OTP is supported

OtpManager consumes, loaded  OTPProvider component to generate OTP by calling its methods

 However OTP manager has a verification algorithm which relies on exact match logic

To conclude it prrovides two services 

Given a key, it allows to generate an OTP

Given a key and OTP it validate whether OTP is matching or not

3.2 OTP Provider 
This is implemented as Springboot Component and  implements the OTP generation logic.

It provides a method computeOtp(String key, int otpLength, String macAlgorithm)

For the given key, otp lenght and Crypto algorithm, generate OTP and return the OTP value

Another method implemented is Signer getSigning(String secret, String macAlgo)

This prepares a Signer with the given secret and specified encryption algorithm and returns

This Signer is used to sign the OTP repsponse

3.3 Notification Service
This Service provides API to send SMS Notifications as well as Email notifications over seperate API

MOSIP implementation should take care of the integration with the service provider interfaces for these services

 

4. REQUIREMENTS & SOLUTION APPROACH
 

4.1 Requirement 
Implement TOTP feature as per RFC 6238 in MOSP  as explained below

4.1.1 Define a new contract for OTPProvider with following methods

String computeOtp(String key, int otpLength, String macAlgorithm, optional optionalParams)

Signer getSigning(String secret, String macAlgo, optional optionalParams)

Boolean match(String otpValue, String secret, optional optionalParams)

 

4.1.2 Implement TOTPProvider component as per this contract

Implement TOTP generation logic in computeOtp method

getSigning could be as per existing OTP Provider class implementation

Implement match method to match the given OTP with the TOTP based generated OTP

 

4.1.3 Refactor existing OTPProvider component by implementing the contract and moving match code( string comparison) to match method

 

4.1.4 Enhance OTP Manager

Enhance OTPGenerator API to support protocol selection ( OTP/TOTP), and addtional required parameters

These could be added in Metadata part of the payload

Enhance OTPValidator API to support protocol selection ( OTP/TOTP), and addtional required parameters

Refactor OtpGeneratorServiceImpl to pick appropriate OTPProvider component based on the selected Protocol and consume the methods from the instance to generate OTP

Refactor OtpValidatorServiceImpl to pick appropriate OTPProvider component based on the selected Protocol and consume match implementation. Other logic of TTL, once usage etc implemented in ValidatorService code.

4.1.5 Refactor Resident Service OTP API(s)

 In ResidentOTPController, enhance the API individualId/otp to support protocol and additional parameters, and refactor the implementation accordingly

In IdAuthController, enhance the API validate-otp to support protocol and additional parameters and refactor the implementation accordingly

4.1.6 Java Client for TOTP generation

Build a test client program which generates the TOTP locally to be sent to Service for testing

4.2 Development Environment
MOSIP shall provide access to Sandbox environment ( VPN Connection) 

Developers could fork from MOSIP gitrepo requiried Repos, develop  and debug locally 

OtpManager, OtpProvider

they can run the OtpManager locally with their implementation of TOTP and test locally

Same thing applies to Resident Service, which could be run locally pointing to other required services from MOSIP Sandbox

To test locally , please use Google Authenticator and custom built client

Resident API could be tested using PostMan

 

4.3 Deployment , Testing & Submission
 

 

5. Deliverables
All required Repos are forked from MOSIP Git Repo

Raise pull request for all the customised code

Check in the test client code, test reports

Any relevant documentation

6. APPENDIX
461 Reference Repo & URLS
MOSIP github   https://github.com/mosip/
MOSIP Common Services Repo  : version 1.2.0-rc2

GitHub - mosip/commons at 1.2.0-rc2 

 

OTP Manager  Service

OTP Generation and Validation service

https://github.com/mosip/commons/tree/1.2.0-rc2/kernel/kernel-otpmanager-serviceConnect your Github account 

 

OtpProvider class

https://github.com/mosip/commons/blob/8020b19262b5d28e2d6306d6d592c6237acb329d/kernel/kernel-otpmanager-service/src/main/java/io/mosip/kernel/otpmanager/util/OtpProvider.java 

Notification Service

https://github.com/mosip/commons/tree/1.2.0-rc2/kernel/kernel-notification-serviceConnect your Github account 

Resident Service Repo 

https://github.com/mosip/resident-services/tree/1.2.0.1-B2/resident/resident-serviceConnect your Github account 

Resident Service OTP Controller

https://github.com/mosip/resident-services/tree/1.2.0.1-B2/resident/resident-serviceConnect your Github account 

