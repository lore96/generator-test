var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.argument('appname', { type: String, required: true });
        this.argument('version', { type: String, required: false });
        this.argument('description', { type: String, required: false });
        this.argument('username', { type: String, required: false });
      
        // And you can then access it later; e.g.
        this.log(this.options.appname);
        // Next, add your custom code
        //this.option('babel'); // This method adds support for a `--babel` flag

    }


    prompting() {
        return this.prompt([{
          type    : 'input',
          name    : 'name',
          message : 'Name of the project'
        },{
            type    : 'input',
            name    : 'version',
            message : 'Version of the project'
        },
        {
            type    : 'input',
            name    : 'description',
            message : 'Description of the project'
        }, {
            type    : 'input',
            name    : 'username',
            message : 'What\'s your GitHub username',
            store   : true
          }]).then((answers) => {
            this.log('app name', answers.name);
            this.log('version', answers.version);
            this.log('description', answers.description);
            this.log('author', answers.username);
            this.log(this.destinationRoot());    
    
        });
      }
};

