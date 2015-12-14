# dotloop

A node.js client for the [dotloop](https://www.dotloop.com) API. This module supports all endpoints that were published in the Dotloop API Developer Guide, dated 2014-08-28.

### What's a Profile?

A dotloop account has one or more profiles. For example, a user might have admin access to a brokerage profile, an office profile, and a personal profile. Each profile has it’s own set of loops and templates. Most calls to the dotloop API require you to specify a profile.

### Loop ID vs Loop View ID

When specifying a loop within the dotloop API you will always a loop view id, not a loop id. In fact, just forget that the loop id exists. We know it’s confusing, we’re sorry! There’s a technical reason why this is but it’s very boring. We’ll spare you the details.

### Getting an API key

To get an API key your dotloop user must have access to the API functionality. To generate a key navigate to the “My Account” link on the profile list in dotloop.

## Installation

```cli
npm install dotloop
```

## Usage

The Dotloop API requires an access token to be passes with every API request. This library will automatically include the bearer authentication header for all API calls once you've initialized the instance variable.

```Javascript
var Dotloop = require('dotloop');
var api = new Dotloop('your auth token');
```

## Callbacks or Promises

All of the methods below will work with either a standard Javascipt callback function `(error, result)` or promises. This module uses the Bluebird promise library.

## Methods

* getProfiles
* getLoops
* getLoopSummary
* getLoopDetails
* getLoopActivities
* getLoopDocuments
* getLoopDocument
* getLoopParticipants
* getLoopTasks
* getLoopFolders
* getDocumentActivities
* getContacts
* getContactDetail
* getEmployees
* getProfileAdmins

#### getProfiles(*[callback]*)

Get all profiles associated with user.

**Sample Response**
```javascript
[
	{
		"profileId": 294625,
		"name": "Profile 1",
		"userId": 0,
		"active": true,
		"deleted": false,
		"profileType": "INDIVIDUAL"
	},
	{
		"profileId": 294626,
		"name": "Profile 2",
		"userId": 0,
		"active": true,
		"deleted": false,
		"profileType": "OFFICE"
	}
]
```

#### getLoops(*profileId*, *[callback]*)

Returns a list of up to 50 summaries for loops in a profile. To get the next 50, increment the batch number.

**Available Options**

| Name        | Description |
|:------------|:------------|
| batchNumber | Increment the batch number to page through results. The default is 1. |
| batchSize   | Number of records to return. The maximum value and default value is 50 |
| statusIds   | filter loops by status id |
| complianceStatusIds | filter loops by compliance status id |
| tagIds | filter loops by tag id |
| sortBy |  |
| searchQuery |  |
| tagNames |  |
| createdByMe |  |

**Sample Response**
```javascript
[
	{
		"loopName": "Atturo Garay ­ 123  Main Street, Chicago, IL 60605",
		"loopId": 34242,
		"loopStatus": "Archived",
		"loopTags": [
			{
				"tagId": 2,
				"tagName": "Buying",
				"profileId": 4533
			}
		],
		"createdBy": 2097622,
		"lastUpdated": "2013­-12­-03T11:38:22-­05:00",
		"loopViewId": 76046
	},
	{
		"loopName": "Atturo Garay ­ 3059 main, chicago, IL 60614",
		"loopId": 34308,
		"loopStatus": "Archived",
		"loopTags": [
			{
				"tagId": 2,
				"tagName": "Buying",
				"profileId": 69020
			}
		],
		"createdBy": 2097622,
		"lastUpdated": "2013-­12-­03T11:46:16-­05:00",
		"loopViewId": 80269
	}
]
```

#### getLoopSummary(*profileId*, *loopViewId*, *[callback]*)

Details of loop view.

**Sample Response**
```javascript

[
	{
		"loopName": "buyers",
		"loopId": 274231,
		"loopStatus": "Private",
		"loopTags": [],
		"createdBy": 2571509,
		"lastUpdated": "2014-­07-­28T16:11:56­-04:00",
		"loopViewId": 404271
	}
]
```

#### getLoopDetails(*profileId*, *loopViewId*, *[callback]*)

Retrieve the loop details for a single loop. Empty fields are not included in the details. Callers should not expect specific properties to always be included.

**Sample Response**
```javascript
{
	"loopId": 15751,
	"sections": {
		"Listing Brokerage": {
			"postalCode": "45242",
			"name": "DotLoop Final Review",
			"stateOrProvince": "OH",
			"streetName": "Lake Forest Dr.",
			"streetNumber": "4445",
			"officePhone": "",
			"city": "Cincinnati"
		},
		"Buying Brokerage": {
			"postalCode": "90210",
			"name": "Bob's Buying Brokerage",
			"stateOrProvince": "CA",
			"streetName": "Mockingbird Ln",
			"streetNumber": "1313",
			"suite": "#1",
			"city": "LA"
		},
		"Property Address": {
			"mlsNumber": "1234567890",
			"propertyAddressCountry": "USA",
			"postalCode": "32123",
			"stateOrProvince": "KS",
			"streetName": "manor ",
			"streetNumber": "1234",
			"country": "USA",
			"city": "lauderdale"
		},
		"Financials": {
			"comissionRate": "7%",
			"earnestMoneyHeldBy": "Steve",
			"originalListingPrice": "500,000",
			"currentPrice": "425000",
			"purchasePrice": "400,000"
		}
	}
}
```

#### getLoopActivities(*profileId*, *loopViewId*, *[options]*, *[callback]*)

Retrieves the activity log for a single loop.

**Available Options**

| Name        | Description |
|:------------|:------------|
| batchNumber | Increment the batch number to page through results. The default is 1. |
| batchSize   | Number of records to return. The maximum value and default value is 50 | 

**Sample Response**
```javascript
[
 	{
		"message": "K Fouts (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"15751\" documentId=\"129497\">Agency Disclosure Statement ­Seller<\/activity>",
		"activityDate": "2014­-01-­09T13:10:14-­05:00"
	},
	{
    	"message": "K Fouts (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"15751\" documentId=\"129493\">ThaiCatering<\/activity>",
		"activityDate": "2014­-01­-09T13:10:14­0-5:00"
	},
	{
		"message": "K Fouts (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"15751\" documentId=\"129493\">ThaiCatering<\/activity>",
		"activityDate": "2014­-01­-09T13:08:39­0-5:00"
	},
	{
		"message": "K Fouts (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"15751\" documentId=\"129497\">Agency Disclosure Statement ­Seller<\/activity>",
		"activityDate": "2014­-01­-09T13:08:27­-05:00"
	},
	{
		"message": "K Fouts (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"15751\" documentId=\"129497\">Agency Disclosure Statement ­Seller<\/activity>",
		"activityDate": "2014­-01­-09T13:07:43­-05:00"
	},
	{
		"message": "K Fouts (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"15751\" documentId=\"129493\">ThaiCatering<\/activity>",
		"activityDate": "2014­-01­-09T13:07:43­-05:00"
	},
	{
    	"message": "K Fouts (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"15751\" documentId=\"129497\">Agency Disclosure Statement ­Seller<\/activity>",
		"activityDate": "2014­-01­-09T13:07:08­-05:00"
	}
]
```


#### getLoopDocuments(*profileId*, *loopViewId*, *[callback]*)

Retrieve a list of documents within a loop

**Sample Response**
```javascript
[
	{
		"loopId": 405260,
		"folderName": "Folder",
		"documentId": 561622,
		"documentName": "Agency Disclosure Statement ­ Seller",
		"signatureVerficationLink": "DL­561622­4­301S",
		"lastModifiedDate": "2014­-08-­25T18:33:46­-04:00",
		"createdDate": "2014­-08-­25T23:29:31­-04:00",
		"sharedWith": [
			"405246",
			"405247",
			"405260"
		],
		"createdBy": 2462
	},
	{
		"loopId": 405260,
		"folderName": "Folder",
		"documentId": 561621,
		"documentName": "sfr­3",
		"signatureVerficationLink": "DL­561621­3­1X3D",
		"lastModifiedDate": "2014­-08­-25T18:26:38-­04:00",
		"createdDate": "2014­-08-­25T23:37:47­-04:00",
		"sharedWith": [
			"405246",
			"405247",
			"405260"
		],
		"createdBy": 2462
	}
]
```

#### getLoopDocument(*profileId*, *loopViewId*, *documentId*, *documentName*, *[callback]*)

Returns a PDF for single document. The parameter “documentName” can be any text, it is provided to let the client choose the file name.

**Sample Response**
No example included. The response will be a `Buffer` object with content type of application/pdf.

#### getLoopParticipants(*profileId*, *loopViewId*, *[callback]*)

List of participants in a loop

**Sample Response**
```javascript
[
	{
		"name": "New Person",
		"email": "new2_person@email.com",
		"role": "None",
		"participantId": 3600616,
		"memberOfMyTeam": "N"
	},
	{
		"name": "DotLoop Final Review",
		"role": "Managing Broker",
		"memberOfMyTeam": "Y"
	},
	{
		"name": "K Fouts",
		"email": "kfouts@email_address.com",
		"role": "Listing Agent",
		"memberOfMyTeam": "Y"
	}
]
```

#### getLoopTasks(*profileId*, *loopViewId*, *[callback]*)

List of tasks in a loop

**Sample Response**
```javascript
[
	{
		"name": "Task New",
		"dueDateType": "2013­-04­-16T00:00:00­-04:00",
		"dueDate": "2013­-04-­16T00:00:00­-04:00",
		"createdDate": "2013­-04­-30T08:32:43-­04:00",
		"listName": "My Tasks",
		"listId": 208,
		"createdBy": 3104719,
		"lockedStatus": "N",
		"completionStatus": "N"
	}
]
```

#### getLoopFolders(*profileId*, *loopViewId*, *[callback]*)

List of folders in a loop.

**Sample Response**

```javascript
[
	{
		"viewId": 259626,
		"folderId": 314074,
		"name": "Folder",
		"archived": false,
		"minimized": false,
		"folderEmailName": "7f9e7d88­c31e­49cc­bf38­199689a7e0ea",
		"lastUpdatedDateISO": "2014­05­27T10:58:21­04:00"
	}
]
```

#### getDocumentActivities(*profileId*, *documentId*, *[options]*, *[callback]*)

Activities associated with document

**Available Options**

| Name        | Description |
|:------------|:------------|
| batchNumber | Increment the batch number to page through results. The default is 1. |
| batchSize   | Number of records to return. The maximum value and default value is 50 | 

**Sample Response**

```javascript
[
	{
		"message": "Meyyalagan Chandrasekaran (Admin for DotLoop Final Review) viewed document <activity action=\"contract­editor\" viewId=\"404271\" documentId=\"560621\">Buyers Sign here<\/activity>",
		"activityDate": "2014­08­19T18:44:52­04:00"
	},
	{
		"message": "Mike Kiburz viewed document <activity action=\"contract­editor\" viewId=\"404271\" documentId=\"560621\">Buyers Sign here<\/activity>",
		"activityDate": "2014­07­28T16:49:36­04:00"
	}
]
```

#### getContacts(*profileId*, *[options]*, *[callback]*)

List of contacts associated with a profile

**Available Options**

| Name        | Description |
|:------------|:------------|
| batchNumber | Increment the batch number to page through results. The default is 1. |
| batchSize   | Number of records to return. The maximum value and default value is 50 | 

**Sample Response**

```javascript
[
	{
		"personId": 3623822,
		"firstName": "Test FirstName",
		"lastName": "Test LastName",
		"email": "FirstLast@test.com"
	},
	{
		"personId": 3603862,
		"firstName": "Test Name",
		"lastName": "Test Name",
		"email": "abc@test.com"
	}
]
```

#### getContactDetails(*profileId*, *contactId*, *[callback]*)

Get contact details

**Sample Response**

```javascript
[
	{
		"personId": 3603862,
		"firstName": "Brian",
		"lastName": "Erwin",
		"email": "brianerwin@newkyhome.com",
		"homephone": "213­893­6332",
		"officephone": "112­121­3656",
		"streetAddress01": "2100 Waterview dr",
		"city": "Richardson",
		"zipOrPostalCode": "75081",
		"fax": "111­865­5686",
		"stateOrProv": "TX"
	}
]
```

#### getEmployees(*profileId*, *[options]*, *[callback]*)

List of up to 5000 summarized employees

**Available Options**

| Name         | Description |
|:-------------|:------------|
| batchNumber  | Increment the batch number to page through results. The default is 1. |
| batchSize    | Number of records to return. The maximum value and default value is 50 |
| showAdmin    | Show only admins |
| showInActive | Show inactive employees |
| includeChild | Include employees from child profiles |

**Sample Response**
```javascript
[
	{
		"memberId": 294132,
		"emailAddress": "smurphy@emailaddress.com",
		"firstName": "Scott",
		"lastName": "Murphy",
		"loopsCreated": 4,
		"totalLoops": 5,
		"status": "ACTIVE",
		"isAdmin": "false"
	},
	{
		"memberId": 290767,
		"emailAddress": "rmurphy@emailaddress.com",
		"firstName": "Rob",
		"lastName": "Murphy",
		"loopsCreated": 1,
		"totalLoops": 1,
		"status": "ACTIVE",
		"isAdmin": "false"
	}
	]
```

#### getProfileAdmins(*profileId*, *[options]*, *[callback]*)

List of admins associated with profile

**Available Options**

| Name        | Description |
|:------------|:------------|
| batchNumber | Increment the batch number to page through results. The default is 1. |
| batchSize   | Number of records to return. The maximum value and default value is 50 | 

**Sample Response**
```javascript
[
	{
		"memberId": 2570270,
		"emailAddress": "sellingAgent@emailaddress.com",
    	"firstName": "TestFirstName2",
    	"lastName": "TestLastName2",
    	"status": "ENROLLED",
    	"isAdmin": "true"
  	}, 
	{
		"memberId": 2629538,
		"emailAddress": "listingAgent@emailaddress.com",
		"firstName": "TestFirstName1",
		"lastName": "TestLastName1",
		"status": "ACTIVE",
		"isAdmin": "true"
	}
]
```