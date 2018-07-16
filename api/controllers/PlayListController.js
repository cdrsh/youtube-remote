const { JSDOM } = sails.config.globals.jsdom;

// Playlist controller
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

//youtube to search string
const strToYoutubeSearchStr=function(par) {
	return par;
}

//not finished
const loadYoutubeVideo=function (par) {
	return new Promise(resolve => {
		var uniqueUrls=[];
		var arNext=[];
		var url="https://youtube.com/results?search_query="+
				strToYoutubeSearchStr(par.title);

		if(par.nextUrl!=="")
			url="https://youtube.com/results?"+
				"sp="+par.nextUrl.trim()+
				"&search_query="+
				strToYoutubeSearchStr(par.title);

		sails.config.globals.requestHttpClient({
			uri:url,
			method:'GET',
			encoding:'binary'
		},
		function (err, res, page) {

			if(err!=null)
				resolve(false);
			
			const dom = new JSDOM(page);
			var arr=dom.window.document.querySelectorAll("a");
			var re=/^\/watch\?v=([a-zA-Z0-9_-]{1,})*/g;
			var ar=[];
			for(var i=0;i<arr.length;i++) {
				if(re.test(arr[i].href)) {
					var Arrr=arr[i].href.match(re);
					if(Arrr.length>0)
						ar.push({href:Arrr[0],title:arr[i].title});
				}
			}
			
			//Grap urls
			ar.map((curVal, index, arr) => { 
				var fnd=uniqueUrls.filter(itm=>itm.href==curVal.href);
				if(fnd.length==0) {
				var found=arr.filter(itm=>itm.href==curVal.href);
				for(var i=0;i<found.length;i++) 
					if(found[i].title.trim()!="") {
						uniqueUrls.push(found[i]);
						break;
					}
				}
			});

			//Grab next urls
			var reNext=/^(\/results)/g;
			for(var i=0;i<arr.length;i++) {
				if(reNext.test(arr[i].href)) {
					var url_parts = sails.config.globals.urlParser.parse(arr[i].href, true);
					var query = url_parts.query;
					if(query.sp!==undefined) {
						var fond=arNext.filter(itm=>itm==query.sp);
						if(fond.length==0)
							arNext.push(query.sp);
					}
				}
			}
	
			resolve({
				videosYT:uniqueUrls,
				nextUrls:arNext
			});
		});

	});
}


const YoutubeURLtoVidId=function(urlVideo) {
	var url_parts = sails.config.globals.urlParser.parse(urlVideo, true);
	var query = url_parts.query;
	if(query.v==undefined) 
		return '';
	else
		return query.v;
}

//Check video service url
const chkVideoserviceUrl=function (urlVideo) {
	return new Promise(resolve => {
		//Check url param
		var url_parts = sails.config.globals.urlParser.parse(urlVideo, true);
		var query = url_parts.query;
		if(query.v==undefined) 
			resolve(false);

		const { JSDOM } = sails.config.globals.jsdom;
		sails.config.globals.requestHttpClient({
			uri:urlVideo,
			method:'GET', 
			encoding:'binary'
		},
		function (err, res, page) {
			if(err!=null) 
				resolve(false);
			resolve(true);
		});
	});
}

//Load Video From URL
const loadVideoFromURL=function (urlVideo) {
	return new Promise(resolve => {

		var url_parts = sails.config.globals.urlParser.parse(urlVideo, true);
		var query = url_parts.query;
		if(query.v!==undefined) {
			sails.config.globals.requestHttpClient({
				uri:'https://www.youtube.com/results?search_query='+query.v,
				method:'GET', 
				encoding:'binary'
			},
			function (err, res, page) {
				if(err!=null)
					resolve(false);
				else {
					const { JSDOM } = sails.config.globals.jsdom;
					const dom = new JSDOM(page);
					var arr=dom.window.document.querySelectorAll("a");
					var ar=[];
					var uniqueUrls=[];
					for(var i=0;i<arr.length;i++) 
						if(arr[i].href.indexOf('v='+query.v)!==-1) 
							ar.push({
								title:arr[i].title,
								href:'https://www.youtube.com'+arr[i].href,
								imgurl:"https://i.ytimg.com/vi/"+query.v+"/mqdefault.jpg"
							});
					
					ar.map((curVal, index, arr) => { 
						var fnd=uniqueUrls.filter(itm=>itm.href==curVal.href);
						if(fnd.length==0) {
							var found=arr.filter(itm=>itm.href==curVal.href);
							for(var i=0;i<found.length;i++) 
								if(found[i].title.trim()!="") {
									uniqueUrls.push(found[i]);
									break;
								}
						}
					});

					resolve(uniqueUrls[0]);
				}
			});
		}
		else
			resolve(false);
	});
}

module.exports = {

	//Get playlists
	getall: async function(req, res) {

		var playlists=await PlayList.find({sort:'num ASC'});
		return res.json({
			status:1,
			playlists:playlists
		});

	},



	//Add Playlist
	addPlaylist: async function(req, res) {

		var nam=req.param('nam');
		if(nam==undefined || nam.trim()=="")
			return res.json({
				status:0,
				playlist:null
			});

		var maxNum=await PlayList.find().max().num;
		if(maxNum==0 || maxNum==undefined)
			maxNum=1;
		else
			maxNum++;
		var playlist=await PlayList.create({
			num:maxNum,
			nam:nam.trim()
		}).fetch();

		return res.json({
			status:1,
			playlist:playlist
		});

	},



	//Edit Playlist (Save)
	editPlaylist: async function(req, res) {

		var nam=req.param('nam');
		var idpl=req.param('idpl');

		if(
			nam==undefined || 
			nam.trim()=="" ||
			idpl==undefined
		)
			return res.json({
				status:0,
				playlist:null
			});

		var playlist=await PlayList.update({id:idpl})
			.set({nam:nam})
			.fetch();

		if(playlist.length==0) {
			return res.json({
				status:0,
				playlist:null
			});
		}

		return res.json({
			status:1,
			playlist:playlist[0]
		});

	},



	//Remove Playlists
	removePlaylist: async function(req, res) {

		var ids=req.param('ids');
		
		for(var i=0;i<ids.length;i++) 
			if(ids[i]==undefined)
				return res.json({status:0});

		await Video.destroy({idpl:ids});
		await PlayList.destroy({id:ids});

		return res.json({status:1});

	},



	//Remove all Playlists
	removeAllPlaylists: async function(req, res) {

		await Video.destroy({});
		await PlayList.destroy({});
		return res.json({status:1});

	},



	//Move Playlist
	movePlaylist: async function(req, res) {

		var id=req.param('id');
		var dir=req.param('dir');
		var num=req.param('num');
		var idNew=-1;

		if(id==undefined || dir==undefined || num==undefined)	
			return res.json({status:0});

		//Move Up
		if(dir==1) {
			var found=await PlayList
			.find({num:{'<':num}})
			.limit(1)
			//.select(['id','num','nam'])
			.select(['id','num'])
			.sort('num DESC');

			if(found.length==0)
				return res.json({status:0});
			else
				found=found[0];
			
			await PlayList
				.update({id:id},{ num:found.num });

			await PlayList
				.update({id:found.id},{ num:num });
			
			idNew=found.id;
		}

		//Move Dw
		if(dir==2) {
			var found=await PlayList
			.find({num:{'>':num}})
			.limit(1)
			//.select(['id','num','nam'])
			.select(['id','num'])
			.sort('num ASC');

			if(found.length==0)
				return res.json({status:0});
			else
				found=found[0];
			
			await PlayList
				.update({id:id},{ num:found.num });

			await PlayList
				.update({id:found.id},{ num:num });
			
			idNew=found.id;
		}
		
		return res.json({status:1, idnew:idNew});
		
	},



	//Import Playlist
	importPlaylist: async function(req, res) {

		return res.json({status:1});
		
	},



	//Export Playlist
	exportPlaylist: async function(req, res) {

		var idpls=req.param('idpls');
		return res.json({status:1});
		
	},




	//=== One playlist ===

	//Get playlist videos
	getOnePlaylist: async function(req, res) {

		var videos=[];
		var idpl=req.param('idpl');

		if(idpl!==undefined)
			videos=await Video.find({where: { idpl:idpl }});

		return res.json({
			status:1,
			videos:videos
		});

	},
	


	//Add Video to playlist
	addVideo: async function(req, res) {

		var url=req.param('url');
		var idpl=req.param('idpl');

		if(
			url==undefined || 
			url.trim()=="" || 
			!(await chkVideoserviceUrl(url)) ||
			idpl==undefined
		)
			return res.json({
				status:0,
				video:null
			});

		var maxNum=await Video
			.find({idpl:idpl})
			.limit(1)
			.select(['num'])
			.sort('num DESC');
			
		if(maxNum.length>0)
			maxNum=maxNum[0].num+1;
		else
			maxNum=1;
		
		
		var loadedVid=await loadVideoFromURL(url);

		var video=await Video.create({
			vidid:YoutubeURLtoVidId(loadedVid.href),
			vid:loadedVid.href,
			tmstart:"",
			fullscr:1,
			w:100,
			h:100,
			quality:1,
			autoplay:1,
			speed:0,
			title:loadedVid.title,
			imgurl:loadedVid.imgurl,
			idpl:idpl,
			num:maxNum
		}).fetch();

		return res.json({
			status:1,
			video:video
		});

	},



	//Edit Video (Save)
	editVideo: async function(req, res) {

		var url=req.param('url');
		var id=req.param('id');

		if(
			url==undefined ||
			url.trim()=="" ||
			!(await chkVideoserviceUrl(url)) ||
			id==undefined
		)
			return res.json({
				status:0,
				video:null
			});

		var loadedVid=await loadVideoFromURL(url);
		var video=await Video
			.update({id:id})
			.set({
				vidid:YoutubeURLtoVidId(loadedVid.href),
				vid:loadedVid.href,
				title:loadedVid.title,
				imgurl:loadedVid.imgurl
			})
			.fetch();

		return res.json({
			status:1,
			video:video[0]
		});

	},



	//Remove Videos
	removeVideo: async function(req, res) {

		var ids=req.param('ids');

		if(ids==undefined || ids.length==0)
			return res.json({status:0});

		for(var i=0;i<ids.length;i++) 
			if(ids[i]==undefined)
				return res.json({status:0});

		await Video.destroy({id:ids});

		return res.json({status:1});

	},



	//Remove All Videos
	removeAllVideos: async function(req, res) {

		var idpl=req.param('idpl');

		if(idpl==undefined)
			return res.json({status:0});

		await Video.destroy({idpl:idpl});
		return res.json({status:1});

	},



	//Move videos
	moveVideo: async function(req, res) {

		var id=req.param('id');
		var dir=req.param('dir');
		var num=req.param('num');
		var idpl=req.param('idpl');
		var idNew=-1;

		if(	id==undefined || 
			dir==undefined || 
			num==undefined ||
			idpl==undefined
		)
			return res.json({status:0});

		//Move Up
		if(dir==1) {
			var found=await Video
				.find({num:{'<':num}, idpl:idpl})
				.limit(1)
				.select(['id','num'])
				.sort('num DESC');

			if(found.length==0)
				return res.json({status:0});
			else
				found=found[0];
			
			await Video
				.update({id:id},{ num:found.num });

			await Video
				.update({id:found.id},{ num:num });
			
			idNew=found.id;
		}

		//Move Dw
		if(dir==2) {
			var found=await Video
				.find({num:{'>':num}, idpl:idpl})
				.limit(1)
				.select(['id','num'])
				.sort('num ASC');

			if(found.length==0)
				return res.json({status:0});
			else
				found=found[0];
			
			await Video
				.update({id:id},{ num:found.num });

			await Video
				.update({id:found.id},{ num:num });
			
			idNew=found.id;
		}
		
		return res.json({status:1, idnew:idNew});
		
	},



	//Youtube video search
	youtubeSearch: async function(req, res) {
		
		var title=req.param('title');
		var nextUrl=req.param('nextUrl');

		if(
			title==undefined || 
			title.trim()=="" || 
			nextUrl==undefined
		)
			return res.json({
				status:0,
				videosYT:[]
			});

		var videosObj=await loadYoutubeVideo({
			nextUrl:nextUrl,
			title:title
		});
		
		if(!videosObj)
			return res.json({
				status:0,
				videosYT:[]
			});

		videosObj.videosYT.map(itm => {
			//Check url param
			var url_parts = sails.config.globals.urlParser.parse(itm.href, true);
			if(url_parts.query.v!==undefined) 
				itm.imgurl="https://i.ytimg.com/vi/"+url_parts.query.v+"/mqdefault.jpg";
			else
				itm.imgurl="https://www.hot-motor.ru/body/clothes/images/no_icon.png";
		});

		return res.json({
			status:1,
			...videosObj
		});

	},



	//play playlist or one video
	play: async function(req, res) {

		var id=req.param('id');
		var idpl=req.param('idpl');

		if(id==undefined && idpl==undefined)
			return res.json({status:0});

		if (!req.isSocket) 
			return res.json({status:0});

		var vid;
		if(idpl!==undefined) {
			vid=await Video
				.find({idpl:idpl})
				.limit(1)
				.sort('num ASC');
			if(vid.length==0)
				return res.json({status:0});
			vid=vid[0];
		}
		else {
			vid=await Video.findOne({id:id});
			if(vid==null)
				return res.json({status:0});
		}

		await sails.sockets.blast('play', vid);

		return res.json({status:1, id:vid.id, idpl:vid.idpl});

	},



	//stop
	stop: async function(req, res) {

		var id=req.param('id');
		var idpl=req.param('idpl');

		if(id==undefined && idpl==undefined)
			return res.json({status:0});

		if (!req.isSocket) 
			return res.json({status:0});

		var vid;
		if(idpl!==undefined) {
			vid=await Video
				.find({idpl:idpl})
				.limit(1)
				.sort('num ASC');
			if(vid.length==0)
				return res.json({status:0});
			vid=vid[0];
		}
		else {
			vid=await Video.findOne({id:id});
			if(vid==null)
				return res.json({status:0});
		}

		await sails.sockets.blast('stop', vid);

		return res.json({status:1, id:vid.id, idpl:vid.idpl});

	},



	//rewind
	rewind: async function(req, res) {

		var idpl=req.param('idpl');

		if(idpl==undefined)
			return res.json({status:0});

		if (!req.isSocket) 
			return res.json({status:0});

		var vid=await Video
				.find({idpl:idpl})
				.limit(1)
				.sort('num ASC');
		if(vid.length==0)
			return res.json({status:0});
		vid=vid[0];

		await sails.sockets.blast('play', vid);

		return res.json({status:1, id:vid.id, idpl:vid.idpl});

	},


	

	//rewind
	nextvideo: async function(req, res) {

		var id=req.param('id');

		if(id==undefined || id==-1)
			return res.json({status:0});

		if (!req.isSocket) 
			return res.json({status:0});

		var vid=await Video.findOne({id:id});

		if(vid==null)
			return res.json({status:0});

		var vidNext=await Video
			.find({idpl:vid.idpl, num:{'>':vid.num}})
			.limit(1)
			.sort('num ASC');

		if(vidNext.length==0)
			return res.json({status:0});
		vidNext=vidNext[0];

		await sails.sockets.blast('next', vidNext);
		await sails.sockets.blast('play', vidNext);

		return res.json({status:1, vidNext:vidNext});

	},
}
