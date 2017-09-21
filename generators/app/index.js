var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.appConfiguration = {};

        this.authorsArray = [{
                value: 'loris',
                name: 'Lorenzo Mussi',
                email: 'lorenzo.mussi@docomodigital.com',
                checked: false
            }, {
                value: 'aurelio',
                name: 'Aurelio Merenda',
                email: 'aurelio.merenda@docomodigital.com',
                checked: false
            }, {
                value: 'jenny',
                name: 'Jenny Cipolli',
                email: 'jenny.cipolli@docomodigital.com',
                checked: false
            }, {
                value: 'flavia',
                name: 'Flavia Calzecchi Onesti',
                email: 'flavia.calzecchi@docomodigital.com',
                checked: false
            }, {
                value: 'pasquale',
                name: 'Pasquale Mangialavori',
                email: 'pasquale.mangialavori@docomodigital.com',
                checked: false
            }, {
                value: 'mirco',
                name: 'Mirco Cipriani',
                email: 'mirco.cipriani@docomodigital.com',
                checked: false
            }, {
                value: 'luca',
                name: 'Luca Orlandini',
                email: 'luca.orlandini@docomodigital.com',
                checked: false
            }, {
                value: 'gionatan',
                name: 'Gionatan Quintini',
                email: 'gionatan.quintini@docomodigital.com',
                checked: false
            }, {
                value: 'nicola',
                name: 'Nicola Garruccio',
                email: 'nicola.garruccio@docomodigital.com',
                checked: false
            }
        ];

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
            name    : 'mainfile',
            message : 'Main file',
            default : 'dist/main.js'
        }, {
            type    : 'input',
            name    : 'globalname',
            message : 'Global name (to be exported in windows)'
        }, {
            type: 'checkbox',
            name: 'author',
            message: 'Tell me who you are (use space bar to select):',
            choices: this.authorsArray
        }];
    }

    prompting(){
        return this.prompt(this.prompts).then((answers) => {
            var authors = [];

            var getAuthor = function (author, authorsArray) { 
                for(var index in authorsArray){
                    if(authorsArray[index].value === author){
                        return authorsArray[index];
                    }
                }

                return false;
            };

            for(var index in answers.author){
                var found = getAuthor(answers.author[index], this.authorsArray);
                if(found){
                    authors.push(found);
                }
            }

            this.log(authors);


            if(!answers.giturl || authors.length <= 0){
                console.log('ERROR: can not proceed. You have to provide a git url or authors.');
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

