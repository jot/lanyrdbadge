lanyrdbadge = function(){
  var l;
  function init(){
    l = document.getElementById('lanyrd');
    if(l && l.nodeName.toLowerCase() === 'a'){
      l.innerHTML += ' <span>(Loading&hellip)</span>';
      var venue = l.getAttribute('href');
      var url = 'http://query.yahooapis.com/v1/public/yql?'+
                'q=select%20*%20from%20html%20where%20url%3D%22'+
                 encodeURIComponent(venue)+
                '%22%20and%20xpath%3D%22%2F%2F*%5Bcontains(%40class%2C\'vevent\')%5D%22'+
                '&diagnostics=true&format=xml&callback=lanyrdbadge.seed';
      var s = document.createElement('script');
      s.setAttribute('src',url);
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }
  function seed(o){
		var events = '';
		for (i=0;i< o.results.length;i++){
    	var res = o.results[i];
    	res = res.replace(/href="/,'href="http://lanyrd.com');
    	res = res.replace(/src="/gi,'src="http://lanyrd.com');
			events += res;
  	}
  	l.parentNode.innerHTML = '<ol class="lanyrd events">'+events+'</ol>';
	}
  return {seed:seed,init:init}
}();
lanyrdbadge.init();