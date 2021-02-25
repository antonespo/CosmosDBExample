function spSetItaly(docToCreate, enforceSchema) {
    if (docToCreate.location !== undefined
        && docToCreate.location.state != undefined
        && docToCreate.location.state == 'IT') {
        docToCreate.location.isItaly = true;
    }
    else if (enforceSchema) {
        throw new Error('Expected document to contain address.countryRegionName property');
    }

    var context = getContext();
    var collection = context.getCollection();
    var response = context.getResponse();

    collection.createDocument(
        collection.getSelfLink(),
        docToCreate,
        {},
        function (err, docCreated) {
            if (err) {
                throw new Error('Error creating document: ' + err.Message);
            }
            response.setBody(docCreated);
        }
    );
}
