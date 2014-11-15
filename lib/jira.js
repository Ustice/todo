'use strict';

var Promise = require('bluebird');
var request = require('request');
var _ 			= require('lodash');
var url 		= require('url');
var API 		= require('jira').JiraApi;

function JiraApi (config, options) {
	if (!config.transport || !config.domain || !config.account || !config.password) throw new ReferenceError('Missing configuration.\n' + JSON.stringify(config, null, '  '));
	options = options || {};

	_.extend(options, {
		baseUri:  config.transport + '://' + config.domain + (config.port ? ':' + config.port : ''),
		account:  config.account,
		password: config.password
	});

	this.options = options;
}


JiraApi.prototype.list = function JiraApi__list (options) {
	var jira = this;

	var reqUrl = jira.options.baseUri + '/rest/api/2/search';
	var jql = [];

	// console.log('Checking authenication.', reqUrl);
	// request(reqUrl, function (error, res, body) {
	// 	console.log('Authentication info: ', error, body);
	// });

	if (!options.options.all) {
		jql.push('assignee = currentUser()');
	}

	if (!options.options.done) {
		jql.push('resolution = Unresolved');
	}

	jql.push('project = "' + options.project +'"');

	jql = jql.join(' AND ') + ' ORDER BY updatedDate DESC';

	// When implimenting a debugging system, you can output the JQL statement here.
	// console.log(jql);

	options = {
		url: reqUrl,
		method: 'POST',
		auth: {
			user: jira.options.account,
			pass: jira.options.password
		},
		json: {
			jql: jql
		}
	}


	return new Promise(function (resolve, reject) {
		request(options, function (err, httpResponse, body) {
			if (err) reject(err);
			else resolve(httpResponse, body)
		});
	});
};

module.exports = JiraApi;
