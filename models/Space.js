var mongoose = require('mongoose');

var SpaceSchema = new mongoose.Schema({
	name: String,
	merchant_code: String,
	type: { type: String, enum: ['dev', 'prod'], default: 'dev' },
	description: String,
	updated_at: { type: Date, default: Date.now },
	database_type: { type: String, enum: ['mssql', 'oracle', 'sybase'], default: 'mssql' },
	services: ServicesSchema,
});

var ServicesSchema = new mongoose.Schema({
	org: ServiceDescriptorSchema,
	cmis: ServiceDescriptorSchema,
	cases: ServiceDescriptorSchema,
	tasks: ServiceDescriptorSchema,
	rules: ServiceDescriptorSchema,
	domains: ServiceDescriptorSchema,
	templates: ServiceDescriptorSchema,
});

var ServiceDescriptorSchema = new mongoose.Schema({
	uri: String,
});

module.exports = mongoose.model('Space', SpaceSchema);