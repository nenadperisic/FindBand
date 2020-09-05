import React, { Component } from 'react';
import '../css/SliderComponent.css';

class SliderComponent extends Component {

    constructor(){
        super();

        this.slideIndex = 0;

        this.plusSlides = this.plusSlides.bind(this);
        this.currentSlide = this.currentSlide.bind(this);
        this.showSlides = this.showSlides.bind(this);
        this.automaticSlides = this.automaticSlides.bind(this);
    }

    async componentDidMount(){
        this.showSlides(this.slideIndex);
        this.automaticSlides();
    }
    
    plusSlides(number){
        this.showSlides(this.slideIndex += number);
    };
    currentSlide(number){
        this.showSlides(this.slideIndex = number);
    };
    
    
    showSlides(n){
        let i;
        let slides = document.getElementsByClassName('slides');
        let dots = document.getElementsByClassName('dot');
        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex-1].style.display = "block";
        dots[this.slideIndex-1].className += " active";
    }

    automaticSlides(){
        // this.slideIndex = 0;
        let i;
        let slides = document.getElementsByClassName("slides");
        let dots = document.getElementsByClassName('dot');

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        this.slideIndex++;
        if (this.slideIndex > slides.length) {
            this.slideIndex = 1
        }
        slides[this.slideIndex-1].style.display = "block";
        dots[this.slideIndex-1].className += " active";
        setTimeout(this.automaticSlides, 20000); // 20000ms = 20sec
    }

    render() {
        return (
            <div id="SliderComponent">
                <div>
                    <div className="slides">
                        <img src="/backgrounds/img1.jpg" alt="sliderImg1" style={{height: "420px"}}/>
                        <div className="text">Welcome to Nađi bend official site!</div>
                    </div>


                    <div className="slides">
                        <img src="/backgrounds/img2.jpg" alt="sliderImg2" style={{height: "420px"}}/>
                        <div className="text">We connect people who are in searh for a member in their band, 
                            people who are looking for other members to form a band or venue where people can play!
                        </div>
                    </div>

                    <div className="slides">
                        <img src="/backgrounds/img3.jpg" alt="sliderImg3" style={{height: "420px"}}/>
                        <div className="text">After registration, you can create an ad, send an email to a member and connect with other musicians with the same vibe!</div>
                    </div>

                    <div className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</div>
                    <div className="next" onClick={() => this.plusSlides(1)}>&#10095;</div>
                </div>
                <br/>

                <div id="dotDiv" style={{textAlign:"center"}}>
                    <span className="dot" onClick={() => this.currentSlide(1)}></span>
                    <span className="dot" onClick={() => this.currentSlide(2)}></span>
                    <span className="dot" onClick={() => this.currentSlide(3)}></span>
                </div>

            </div>   
        );
    }

}

export default SliderComponent;