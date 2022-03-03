require([
    "esri/map",
    "esri/geometry/Extent",
    "esri/layers/FeatureLayer",
    "esri/tasks/ServiceAreaTask",
    "esri/tasks/ServiceAreaParameters",
    "esri/tasks/FeatureSet",
    "esri/tasks/query",
    "esri/geometry/Point",
    "esri/Color",


    "esri/graphic",

    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/ready",
    "dojo/parser",
    "dojo/on",
    "dojo/dom",

    "dojo/_base/Color",
    "dojo/_base/array",

    "esri/geometry/Circle",
    "esri/tasks/locator"],
    function (Map, Extent, FeatureLayer, ServiceAreaTask, ServiceAreaParameters, FeatureSet, Query, Point, Color,
        Graphic,
        SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol,
        ready, parser, on, dom,
        Color, array,
        Circle, Locator) {

        ready(function () {


            parser.parse();

            var mapMain = new Map("divMap", {
                basemap: "topo-vector",
                extent: new Extent({
                    xmin: -438662.76577918115,
                    ymin: 4916147.898086884,
                    xmax: -379959.1280562449,
                    ymax: 4942747.9839300895,
                    spatialReference: {
                        wkid: 102100
                    }
                })
            })

            

            var centrosSalud = new FeatureLayer("https://services5.arcgis.com/zZdalPw2d0tQx8G1/arcgis/rest/services/CentrosSalud/FeatureServer/0",{
                outFields:["*"],
            });
            mapMain.addLayer(centrosSalud);
            
            
            var fs = new FeatureSet();
            cueri = new Query(centrosSalud);
        
            
            cueri.where = "1 = 1";
            

           centrosSalud.selectFeatures(cueri);


            centrosSalud.on("selection-complete", añade);

            function añade (seleccion){
                var features = []
                // console.log(seleccion);
                fs.features = seleccion.features;
                var puntos = fs.features
                console.log("ptos 1", puntos)
                mapClickHandler(puntos);
                
            };

        
            



            var centros = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer");


            params = new ServiceAreaParameters();
            params.defaultBreaks = [1];
            params.outSpatialReference = mapMain.spatialReference;
            params.returnFacilities = false;


            mapMain.on("click", mapClickHandler);


            function mapClickHandler(puntos) {
                console.log
                console.log("puntos2", puntos[0].attributes.LATITUDE)
                console.log("puntos2", puntos[0].attributes)

                for (let i = 0; i < 19; i++) {
                    

                    params.facilities = puntos[i];
                    console.log('p', params)







                    // centros.solve(params, function (solveResult) {
                    //     var polygonSymbol = new SimpleFillSymbol(
                    //         "solid",
                    //         new SimpleLineSymbol("solid", new Color([232, 104, 80]), 2),
                    //         new Color([232, 104, 80, 0.25])
                    //     );
                    //  
    
                    // }, function (err) {
                    //     console.log(err.message);
                    // });

                    // puntitos.push(puntos[i].attributes.LATITUDE);
                  }
                
                
                mapMain.graphics.clear(); //clear existing graphics
                //define the symbology used to display the results and input point
                // var pointSymbol = new SimpleMarkerSymbol(
                //     "diamond",
                //     20,
                //     new SimpleLineSymbol(
                //         "solid",
                //         new Color([88, 116, 152]), 2
                //     ),
                //     new Color([88, 116, 152, 0.45])
                // );



                

                // var inPoint = new Point(evt.mapMainPoint.x, evt.mapMainPoint.y, mapMain.spatialReference);
                // var location = new Graphic(inPoint, pointSymbol);


                // COMO METER FACILITIES, LEER CON ATENCION, fijarse en los puntos tambien (lo de arriba)
;
                // params.facilities = puntos.a;

                //solve
                // centros.solve(params, function (solveResult) {
                //     var polygonSymbol = new SimpleFillSymbol(
                //         "solid",
                //         new SimpleLineSymbol("solid", new Color([232, 104, 80]), 2),
                //         new Color([232, 104, 80, 0.25])
                //     );
                //     arrayUtils.forEach(solveResult.serviceAreaPolygons, function (serviceArea) {
                //         serviceArea.setSymbol(polygonSymbol);
                //         mapMain.graphics.add(serviceArea);
                //     });

                // }, function (err) {
                //     console.log(err.message);
                // });
            }
        });
    });





