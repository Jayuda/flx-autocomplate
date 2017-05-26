/**
 * Generated from flexurio tools
 * Flexurio By Pamungkas Jayuda yulius.jayuda@gmail.com / +628119003077
 */


flxautocomplate = {};
flxautocomplate.enableLogging = false;

var log = function (level, message) {
    if (flxautocomplate.enableLogging)
        console.log('flxautocomplate - ' + level + ' - ' + message);
};

var logObj = function (obj) {
    if (flxautocomplate.enableLogging)
        console.dir(obj);
};

/**
 * Run a database query to find all objects and populate the autocomplete box
 * @param config
 */
flxautocomplate.autocomplete = function (config) {
    if (typeof(config) === 'undefined'){
        log('ERROR', 'Missing required config parameter in autocompleter()');
        return
    }

    // Build the query
    initQuery = {};
    let dataOR = [];
    let dataNamaKolom = config['field'];
    let namaKolom = '';
    let dicari = '';
    let objectOR = {};

    for (var i = 0; i < dataNamaKolom.length; i++) {
        namaKolom = dataNamaKolom[i];
        dicari = ".*" + $(config['element']).val() + ".*";
        objectOR = {};
        objectOR[namaKolom] = {$regex:dicari,$options: 'i'}
        dataOR.push(objectOR);

    }
    initQuery['$or'] = dataOR;

    if (typeof(config['filter']) === 'undefined')
        query = initQuery;
    else
        query = mergeObjects(initQuery, config['filter']);
    log('DEBUG', 'Query object: ');
    logObj(query);

    // Build filtering
    filter = {};
    filter['limit'] = config['limit'];
    filter['sort'] = config['sort'];
    filter['fields'] = config['fields'];

    log('DEBUG', 'Filter object: ');
    logObj(filter);

    // Set session biar subscribtions jalan duluan
    Session.set('oOPTIONS_'+config['name'], filter);
    Session.set('oFILTERS_'+config['name'], query);

    // Find all results
    results = config['collection'].find(query, filter).fetch();
    log('DEBUG', 'Results object: ');
    logObj(results);

    Session.set(config['name'], results);
};

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
var mergeObjects = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
