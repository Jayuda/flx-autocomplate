Package.describe({
    name: 'jayuda:flx-autocomplate',
    version: '0.1.9',
    summary: "Simple autocomplete on Input element",
    git: 'https://github.com/Jayuda/flx-autocomplate',
    documentation: 'README.md'
});

Package.onUse(function(api){
    api.versionsFrom('1.1.0.2');
    api.use('meteor-platform');
    api.imply('templating');
    api.export('flxautocomplate', 'client');
    api.addFiles([
        'client/flxautocomplate.js'
    ], 'client');
});
