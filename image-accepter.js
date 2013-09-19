var http = require('http');
var url  = require('url');
var qs   = require('querystring');

var server = http.Server(function(req, res) {
	if (req.method == 'GET'){
		res.writeHead(200,{'content-type':'text/html'});
		var newl = '<br>';
		res.write('connection successful'+newl);
	
		var urlParts = url.parse(req.url,true),
			queryString = urlParts.query;
//			paths = urlParts.pathname.split("/");

//		res.write('url-parts: ' + urlParts +newl);
//		res.write('queryStr : ' +queryString + newl);
//		res.write('paths    : ' +paths + newl);
		if (queryString.uid){
			res.write(newl+' UID   = ' +queryString.uid+newl);
			console.log('incoming GET from uid "'+queryString.uid+'"');
		} else {
			res.end(newl+'ERR: uid = unidentified');
		}
		if (queryString.data){
			var data = queryString.data;
	
			res.write(newl+' data  = ' +data+newl);	
			res.write(newl+'image: <img src="data:image/png;base64,'+queryString.data+'"/>'+newl);

			var fname = 'images/'+queryString.uid+'.png';
			require('fs').writeFile(fname,data,'base64',function(err){
				if (err){
					res.end(newl+'ERR: image write error');
					console.log('error writing image'+err);
				}
			});	
			res.write('image saved to '+fname);
	
			res.end(newl+'connection closed.'+newl);
		} else {
			res.end(newl+'ERR: data = unidentified');
		}
	} else if (req.method = 'POST'){
		body = '';
		req.on('data', function (chunk) {
			body+=chunk;
			if(body.length > 1e6){ //protect from flood attack
				response.writeHead(413,{'content-type':'text/plain'}).end();
				request.connection.destroy();
			}
		});
		req.on('end', function () {
			var result = qs.parse(body);
			console.log('incoming POST from uid:'+result.uid);
			res.writeHead(200,{'content-type':'text/plain'});
			var fname = 'images/'+result.uid+'.png';
		//	dat = unescape(result.data).replace(/(\r\n|\n|\r)/gm,"");	//for removing endlines
			dat = unescape(result.data);
			require('fs').writeFile(fname,dat,'base64',function(err){
				if (err){
					res.end('ERR: image write error');
					console.log('err writing image:'+err);
				}
			});
			console.log(dat);
			res.end('great success; very nice.');
		});
	} else { //unsupported request method
		res.writeHead(405,{'content-type':'text/plain'});
		res.end();
	}
});

server.listen(9001);
