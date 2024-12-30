const testimonials = [
  {
    image:
      "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Nice",
    author: "Charles",
    star: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Well Done",
    author: "Dicky",
    star: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Not Bad",
    author: "Dina",
    star: 3,
  },
  {
    image:
      "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "pretty bad",
    author: "Lola",
    star: 2,
  },
  {
    image:
      "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "pretty bad",
    author: "Lola",
    star: 2,
  },
  {
    image:
      "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "pretty bad",
    author: "Lola",
    star: 2,
  },
  {
    image:
      "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "pretty bad",
    author: "Lola",
    star: 2,
  },
];


function getAllTestimonials() { 
  const testimonialHTML = testimonials.map((testimonial) => {
    return ` <div class="testimonial text-center">
              <img src="${testimonial.image}"/>
              <p class="quote">"${testimonial.content}"</p>
              <p class="author">- ${testimonial.author}</p>
              <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
          </div>`
  })
  
  document.getElementById("testimonials").innerHTML = testimonialHTML.join("")
}

function getTestimonialByStar(star) {
  const filteredTestimonials = star ? testimonials.filter((testimonial) => {
    return testimonial.star === star
  })
  : testimonials

  const testimonialHTML = filteredTestimonials.map((testimonial) => {
    return `<div class="testimonial text-center">
              <img src="${testimonial.image}" class="profile-testimonial" />
              <p class="quote">"${testimonial.content}"</p>
              <p class="author">- ${testimonial.author}</p>
              <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
            </div>`
  })
  
  document.getElementById("testimonials").innerHTML = testimonialHTML.join("")
}

getAllTestimonials()
