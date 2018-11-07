class utils {
  constructor(toProperCase, random) {
    this.toProperCase = (string)  => {
      return string.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }  

    this.toInvertedCase = (string)  => {
      return string.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
       return txt.charAt(0).toLowerCase() + txt.substr(1).toUpperCase()
      });
    } 

    this.random = function() {
      return this[Math.floor(Math.random() * this.length)];
    };
    
    
    
  }
}

module.exports = utils
