'use strict';

var Promise = require('bluebird');
var fs 			= Promise.promisifyAll(require('fs'));
var exec 		= Promise.promisify(require('child_process').exec);

var defaultDevelopBranch;

function GitError () {};
GitError.prototype = Object.create(Error.prototype);

function FileReadError () {};
FileReadError.prototype = Object.create(Error.prototype);

function getRootDirectory () {
	return exec('git rev-parse --show-toplevel').then(function (response) {
		response = response[0].replace(/\n$/, '');
		return response;
	});
};
module.exports.getRootDirectory = getRootDirectory;

function getCurrentBranch () {
	return exec('git symbolic-ref HEAD --short');
};
module.exports.getCurrentBranch = getCurrentBranch;

function rebase (branch) {
	var rootDirectory;

	if (!branch) {
		getRootDirectory()
	}
}
module.exports.rebase = rebase;

function doesBranchExist (branch) {
	return exec('git show-ref refs/heads/"' + branch + '"')
	.then(function (stdout, stderr) {
		if (stderr) {
			throw new GitError('Error verifying branch, "' + branch + '". ' + stderr);
		}
		return stdout;
	})
};
module.exports.doesBranchExist = doesBranchExist;

function getDefaultDevelopBranch () {
	if (defaultDevelopBranch) return Promise.resolve(defaultDevelopBranch);

	return getRootDirectory(function (rootDirectory) {
		fs.readFileAsync(rootDirector + '/todo.config', 'utf8').then(function (todoCongif) {
			if (todoConfig) todoConfig = JSON.parse(todoConfig);
			if (todoConfig.git) {
				defaultDevelopBranch = todoConfig.git.develop || 'develop';
			}
			return doesBranchExist(defaultDevelopBranch);
		}).catch(function (error) {
			throw new FileReadError('Unable to read the todo.config file.');
		}).then(function (branchExists) {
			if (!branchExists) throw new GitError('Unable to locate a develop branch.');
			return defaultDevelopBranch;
		});
	});
};
module.exports.getDefaultDevelopBranch = getDefaultDevelopBranch;