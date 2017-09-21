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
            message : 'Version of the project',
            default : '0.1.0'
        }, {
            type    : 'input',
            name    : 'description',
            message : 'Description of the project',
            default : ''
        }, {
            type    : 'input',
            name    : 'keywords',
            message : 'Keywords (separated by comma)'
        }, {
            type    : 'input',
            name    : 'license',
            message : 'License',
            default : 'MIT'
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
            message : 'Author email',
        }, {
            type    : 'input',
            name    : 'mainfile',
            message : 'Main file',
            default : 'dist/main.js'
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

            if(!answers.globalname){
                answers.globalname = answers.appname
            }

            if(answers.keywords){
                while(answers.keywords.indexOf(' ') >= 0){
                    answers.keywords = answers.keywords.replace(' ', '');
                }

                if(answers.keywords.indexOf(',') >= 0){
                    answers.keywords = answers.keywords.split(','); 
                    answers.keywords = answers.keywords.map(function(key){
                        return '"' + key + '"';
                    });             
                } else {
                    answers.keywords = '"' + answers.keywords + '"';
                }
            }
            
            this.appConfiguration = answers;
            this.log(this.appConfiguration);
        });
    }

    writing(){
        var copy = function (dest) {
            this.fs.copyTpl(
                this.templatePath(''),
                this.destinationPath(dest),
                this.appConfiguration
            );
        }.bind(this);

        if(this.appConfiguration){
            // mkdirp --> copy empty folder
            mkdirp.sync(this.destinationRoot() + '/' + this.appConfiguration.appname + '/dist');
            mkdirp.sync(this.destinationRoot() + '/' + this.appConfiguration.appname + '/docs');
            copy(this.destinationRoot() + '/' + this.appConfiguration.appname);
        }
    }
};

