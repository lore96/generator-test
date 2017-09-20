var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.argument('appname', { type: String, required: true });

        this.appConfiguration = {};

        this.prompts = [{
            type    : 'input',
            name    : 'name',
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
            name    : 'authors',
            message : 'Author'
        }, {
            type    : 'input',
            name    : 'mainFile',
            message : 'Main file'
        }, {
            type    : 'input',
            name    : 'globalname',
            message : 'Global name (to be exported in windows)'
        }];
    }

    prompting(){
        return this.prompt(this.prompts).then((answers) => {
            if(!answers.giturl || !answers.authors){
                console.log('ERROR: can not proceed. Name, Git url or authors not provided!');
                return;
            }

            if(!answers.name){
                answers.name = this.options.appname;
            }

            if(!answers.version){
                answers.version = '0.1.0';
            }

            if(!answers.license){
                answers.license = 'MIT';
            }

            if(!answers.mainfile){
                answers.mainfile = 'main.js'
            }

            if(!answers.globalname){
                answers.globalname = answers.name
            }

            this.appConfiguration = answers;
        });
    }

    test(){
        this.log(this.destinationRoot());        
        this.log(this.appConfiguration);
    }
};

