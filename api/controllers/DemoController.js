var getRnd=function(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}

module.exports = {

	//Fill tables with demo data
	filldemo: async function(req, res) {

		await PlayList.destroy({});
		await Video.destroy({});

		//Videos
		var vidUrlsDemoArr=[
			"m81koYhgc5o",
			"zfXBNQMj2SE",
			"C_pMzTSKTI0",
			"FU8csnZxdPA"
		];

		var k=1;
		//Playlists
		var playlists=["Cartoons","Music","Films"];
		for(var i=0;i<playlists.length;i++) {
			var playlistOne=await PlayList.create({
				num:i+1,
				nam:playlists[i]
			}).fetch();
			
			//Videos
			var cnt=getRnd(3,10);
			for(var j=0;j<cnt;j++) {
				var numVid=getRnd(0,vidUrlsDemoArr.length);
				var vidObj={
					//id:k,
					vidid:vidUrlsDemoArr[numVid],
					vid:"https://www.youtube.com/watch?v="+vidUrlsDemoArr[numVid],
					tmstart:"",
					fullscr:1,
					w:100,
					h:100,
					quality:1,
					autoplay:1,
					speed:0,
					title:"Video title "+vidUrlsDemoArr[numVid],
					imgurl:"https://i.ytimg.com/vi/"+vidUrlsDemoArr[numVid]+"/mqdefault.jpg",
					idpl:playlistOne.id,
					num:j
				};
				await Video.create(vidObj);
				k++;
			}
		}

		return res.json({
			status: 'ok'
		});
	}

}