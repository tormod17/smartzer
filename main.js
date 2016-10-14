(function() {

    var lightBox = {
        INIT: function(selector) {
            var videoContainer = document.querySelector(ele);
            var videoFrame = videoContainer.querySelector('img');
            var videoUrl = videoFrame.src
            var elements = this.createElements();
           
            this.openLightBox(elements, videoFrame, videoUrl)
        },

        styles: function(){
          return [this.lbStyle, this.imageStyle, this.closeButtonStyle, this.svgStyle]
        },

        openLightBox: function(elements, videoFrame, videoUrl) {
            var self = this;
            videoFrame.addEventListener('click', function() {

                elements[0].setAttribute('id', 'lb-container');
                elements[0].appendChild(elements[2]);
                elements[1].setAttribute('src', videoUrl);
                elements[0].appendChild(elements[1]);
                elements[2].appendChild(elements[3]);

                self.renderLightBox(elements[0]);
                self.fadeIn(elements[0]);
            });
        },
        createElements: function() {
            var lbContainer = document.createElement('div');
            var lbImage = document.createElement('img');
            var closeButton = document.createElement('div');
            var svg = this.makeSvg(closeButton);
            var elements = [lbContainer, lbImage, closeButton, svg]
            var styles = this.styles();
            var styledElements = this.styleElements(elements, styles);
            return styledElements;
        },

        styleElements: function(elements, styles) {
            var self = this;
            var styledElements = elements.map((ele, i) => {
                return self.addStyle(ele, styles[i])
            })
            return styledElements;
        },
        addStyle: function(ele, stylesValue) {
            Object.keys(stylesValue).forEach((style) => {
                ele.style[style] = stylesValue[style]
            })
            return ele
        },

        renderLightBox: function(ele) {
            document.body.appendChild(ele)
        },
        fadeIn: function(ele, display) {
            ele.style.opacity = 0;
            ele.style.display = display || "block";

            (function fade() {
                var val = parseFloat(ele.style.opacity);
                if (!((val += .1) > 1)) {
                    ele.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            })();
        },
        fadeOutRemove: function(ele) {
            var self = this;
            ele.style.opacity = 1;
            (function fade() {
                if ((ele.style.opacity -= .1) < 0) {} else {
                    requestAnimationFrame(fade);
                }
            })();
            setTimeout(function() {
                var lb = document.getElementById('lb-container');
                self.removeLb(lb);
            }, 1000);
        },
        removeLb: function(ele) {
            document.body.removeChild(ele);
        },

        makeSvg: function(element) {
            var self = this;

            element.onclick = function() {
                var box = element.parentNode
                self.fadeOutRemove(element.parentNode);
            }

            var ns = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(ns, "svg");
            var path = document.createElementNS(ns, "path");

            svg.style.transition = "1s ease";
            element.onmouseover = function() {
                svg.style.webkitTransform = "rotateZ(90deg)";
                svg.style.transform = "rotateZ(90deg)";
            }
            element.onmouseout = function() {
                svg.style.webkitTransform = "";
                svg.style.transform = "";
            }

            svg.appendChild(path);
            element.appendChild(svg);

            svg.setAttribute("viewBox", "0 0 100 100");
            svg.setAttribute("preserveAspectRatio", "none");

            path.setAttribute("d", "M0,0 L100,100 M0,100 L100,0");
            path = self.addStyle(path, { stroke: "#fff", strokeWidth: "5px" })
            return svg
        },
        lbStyle: {
            position: 'fixed',
            top: '0',
            right: '0',
            left: '0',
            bottom: '0',
            margin: 'auto',
            width: '50%',
            height: '50%',
            backgroundColor: 'black',
            padding: '5em',
            textAlign: 'center',
            border: "2px solid #fff"
        },
        imageStyle: {
            maxWidth: "100%",
            maxHeight: '100%'
        },

        closeButtonStyle: {
            position: "absolute",
            top: "1rem",
            right: "1rem"
        },

        svgStyle: {
            width: "2em",
            margin: "1em"
        },
    }
    lightBox.INIT('.smartzerLightboxTrigger');
}())
