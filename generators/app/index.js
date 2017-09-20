var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.appConfiguration = {};

        this.prompts = [{
            type    : 'input',
            name    : 'appname',
            message : 'Name of the project'
        }, {
            type    : 'input',
            name    : 'version',
            message : 'Version of the project'
        }, {
            type    : 'input',
            name    : 'description',
            message : 'Description of the project'
        }, {
            type    : 'input',
            name    : 'keywords',
            message : 'Keywords'
        }, {
            type    : 'input',
            name    : 'license',
            message : 'License'
        }, {
            type    : 'input',
            name    : 'giturl',
            message : 'Git url'
        }, {
            type    : 'input',
            name    : 'authorName',
            message : 'Author name'
        }, {
            type    : 'input',
            name    : 'authorEmail',
            message : 'Author email'
        }, {
            type    : 'input',
            name    : 'mainfile',
            message : 'Main file'
        }, {
            type    : 'input',
            name    : 'globalname',
            message : 'Global name (to be exported in windows)'
        }];
    }

    prompting(){
        return this.prompt(this.prompts).then((answers) => {
            if(!answers.giturl || !answers.authorName || !answers.authorEmail){
                console.log('ERROR: can not proceed. Name, Git url or authors not provided!');
                this.appConfiguration = false;
                return;
            }

            if(!answers.appname){
                answers.appname = this.options.appname;
            }

            if(!answers.version){
                answers.version = '0.1.0';
            }

            if(!answers.license){
                answers.license = 'MIT';
            }

            if(!answers.mainfile){
                answers.mainfile = 'dist/main.js'
            }

            if(!answers.globalname){
                answers.globalname = answers.appname
            }

            this.appConfiguration = answers;
        });
    }

    writing(){
        if(this.appConfiguration){
            // mkdirp --> copy empty folder
            mkdirp.sync(this.destinationRoot() + '/' + this.appConfiguration.appname + '/dest');
            mkdirp.sync(this.destinationRoot() + '/' + this.appConfiguration.appname + '/docs');

            this.fs.copyTpl(
                this.templatePath('examples'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/examples/'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('src'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/src/'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('test'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/test/'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('.eslintignore'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/.eslintignore'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('.eslintsrc'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/.eslintsrc'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('.gitignore'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/.gitignore'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('.npmignore'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/.npmignore'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('.travis.yml'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/.travis.yml'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/bower.json'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('CHANGELOG.md'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/CHANGELOG.md'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('CONTRIBUTE.md'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/CONTRIBUTE.md'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/gulpfile.js'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('karma.conf.js'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/karma.conf.js'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/package.json'),
                this.appConfiguration
            );
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath(this.destinationRoot() + '/' + this.appConfiguration.appname + '/README.md'),
                this.appConfiguration
            );
        }
    }
};

