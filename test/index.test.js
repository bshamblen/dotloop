var assert = require('assert');
var Dotloop = require('../index');
var api = new Dotloop('your dotloop auth token');
var firstProfile;
var firstContact;
var firstTransaction;
var firstDocument;

describe('Test API Enpoints', function() {
	it('Get profile list', function(done) {
		api.getProfiles()
		.then(function(profiles) {
			assert.equal(Array.isArray(profiles), true);
			assert.notEqual(profiles.length, 0);
			firstProfile = profiles.filter(function(profile) {
				return profile.profileType === 'COMPANY';
			})[0];
			done();
		})
		.catch(done);
	});

	it('Get employee list', function(done) {
		api.getEmployees(firstProfile.profileId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			assert.notEqual(results.length, 0);
			done();
		})
		.catch(done);
	});

	it('Get loop list', function(done) {
		api.getLoops(firstProfile.profileId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			assert.notEqual(results.length, 0);
			firstTransaction = results[0];
			done();
		})
		.catch(done);
	});

	it('Get loop summary', function(done) {
		api.getLoopSummary(firstProfile.profileId, firstTransaction.loopViewId)
		.then(function(results) {
			assert.notEqual(results, null);
			done();
		})
		.catch(done);
	});

	it('Get loop details', function(done) {
		api.getLoopDetails(firstProfile.profileId, firstTransaction.loopViewId)
		.then(function(results) {
			assert.notEqual(results, null);
			done();
		})
		.catch(done);
	});

	it('Get loop tasks', function(done) {
		api.getLoopTasks(firstProfile.profileId, firstTransaction.loopViewId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			done();
		})
		.catch(done);
	});

	it('Get loop folders', function(done) {
		api.getLoopFolders(firstProfile.profileId, firstTransaction.loopViewId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			done();
		})
		.catch(done);
	});

	it('Get loop documents', function(done) {
		api.getLoopDocuments(firstProfile.profileId, firstTransaction.loopViewId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);

			if (results.length > 0) {
				firstDocument = results[0];
			}

			done();
		})
		.catch(done);
	});

	it('Get loop document', function(done) {
		if (firstDocument) {
			api.getLoopDocument(firstProfile.profileId, firstTransaction.loopViewId, firstDocument.documentId, 'test-doc')
			.then(function(results) {
				assert.notEqual(results, null);
				done();
			})
			.catch(done);
		} else {
			console.log('First loop doesn\'t have any documents. Skipped document download test.')
			done();
		}
	});

	it('Get document activities', function(done) {
		if (firstDocument) {
			api.getDocumentActivities(firstProfile.profileId, firstDocument.documentId)
			.then(function(results) {
				assert.equal(Array.isArray(results), true);
				done();
			})
			.catch(done);
		} else {
			console.log('First loop doesn\'t have any documents. Skipped document activities test.')
			done();
		}
	});

	it('Get loop participants', function(done) {
		api.getLoopParticipants(firstProfile.profileId, firstTransaction.loopViewId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			done();
		})
		.catch(done);
	});

	it('Get loop activities', function(done) {
		api.getLoopActivities(firstProfile.profileId, firstTransaction.loopViewId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			done();
		})
		.catch(done);
	});

/* not working right now
	it('Get profile admins', function(done) {
		api.getProfileAdmins(firstProfile.profileId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			assert.notEqual(results.length, 0);
			done();
		})
		.catch(done);
	});

	it('Get contact list', function(done) {
		api.getContacts(firstProfile.profileId)
		.then(function(results) {
			assert.equal(Array.isArray(results), true);
			assert.notEqual(results.length, 0);
			done();
		})
		.catch(done);
	});
*/
});
