var _ = require('underscore');
var request = require('request');
var Promise = require('bluebird');

var Dotloop = function(authToken) {
	this.authToken = authToken;
}

Dotloop.prototype.sendGetRequest = function(path, options, callback) {
	if (_.isFunction(options)) {
		callback = options;
		options = {};
	}

	options = options || {};

	var deferred = Promise.pending();
	var url = 'https://www.dotloop.com/my/api/v1_0' + path;
	var encoding = undefined;

	if (!_.isUndefined(options.encoding)) {
		encoding = options.encoding;
		delete options.encoding;
	}

	if (!_.isEmpty(options)) {
		var qp = _.pairs(options).map(function(pair) {
			return pair[0] + '=' + encodeURIComponent(pair[1]);
		}).join('&');

		url = url + '?' + qp;
	};

	var reqOptions = {
		url: url,
		method: 'GET',
		json: true,
		headers: {
			'Authorization': 'Bearer ' + this.authToken
		}
	}

	if (!_.isUndefined(encoding)) {
		reqOptions.encoding = encoding;
	}

	request(reqOptions, function(err, response, body) {
		if (err) {
			callback && callback(err);
			deferred.reject(err);
		} else if (!err && (response.statusCode < 200 || response.statusCode >= 300) && body) {
			callback && callback(new Error(body));
			deferred.reject(new Error(body));
		} else {
			try {
				if (_.isString(body)) {
					body = JSON.parse(body);
				}

				callback && callback(null, body);
				deferred.resolve(body);
			} catch (err) {
				callback && callback(err);
				deferred.reject(err);
			}
		}
	});

	return deferred.promise;
}

Dotloop.prototype.getProfiles = function(callback) {
	return this.sendGetRequest('/profile', {}, callback);
}

Dotloop.prototype.getEmployees = function(profileId, options, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/employee', options, callback);
}

Dotloop.prototype.getProfileAdmins = function(profileId, options, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/admin', options, callback);
}

Dotloop.prototype.getContacts = function(profileId, options, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/person', options, callback);
}

Dotloop.prototype.getContactDetail = function(profileId, contactId, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/person/' + contactId, {}, callback);
}

Dotloop.prototype.getLoops = function(profileId, options, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop', options, callback);
}

Dotloop.prototype.getLoopSummary = function(profileId, loopViewId, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId, {}, callback);
}

Dotloop.prototype.getLoopDetails = function(profileId, loopViewId, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId + '/detail', {}, callback);
}

Dotloop.prototype.getLoopTasks = function(profileId, loopViewId, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId + '/task', {}, callback);
}

Dotloop.prototype.getLoopFolders = function(profileId, loopViewId, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId + '/folder', {}, callback);
}

Dotloop.prototype.getLoopDocuments = function(profileId, loopViewId, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId + '/document', {}, callback);
}

Dotloop.prototype.getLoopDocument = function(profileId, loopViewId, documentId, documentName, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId + '/document/' + documentId + '/' + documentName + '.pdf', {encoding: null}, callback);
}

Dotloop.prototype.getDocumentActivities = function(profileId, documentId, options, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/document/' + documentId + '/activity', options, callback);
}

Dotloop.prototype.getLoopParticipants = function(profileId, loopViewId, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId + '/participant', {}, callback);
}

Dotloop.prototype.getLoopActivities = function(profileId, loopViewId, options, callback) {
	return this.sendGetRequest('/profile/' + profileId + '/loop/' + loopViewId + '/activity', options, callback);
}

module.exports = Dotloop;
