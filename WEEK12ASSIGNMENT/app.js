const tickets = [

    {
        id: "regular",
        name: "Regular Access",
        price: 5000,
        description: "Standard event access"
    },
    {
        id: "vip",
        name: "VIP Access",
        price: 15000,
        description: "Priority access + VIP area"
    },
    {
        id: "vvip",
        name: "VVIP Access",
        price: 30000,
        description: "Premium access + front row"
    }

];

const state = {

    selectedTicket: null,

    profileImage: "",

    booking: null

};


const ticketGrid =
    document.querySelector("#ticketGrid");

const continueBtn =
    document.querySelector("#continueBtn");

const ticketStep =
    document.querySelector("#ticketStep");

const detailsStep =
    document.querySelector("#detailsStep");

const successStep =
    document.querySelector("#successStep");

const bookingForm =
    document.querySelector("#bookingForm");

const backBtn =
    document.querySelector("#backBtn");

const formError =
    document.querySelector("#formError");

const avatarInput =
    document.querySelector("#avatarInput");

const uploadTrigger =
    document.querySelector("#uploadTrigger");

const avatarPreview =
    document.querySelector("#avatarPreview");

const uploadText =
    document.querySelector("#uploadText");


function formatNaira(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


function displayTickets() {

    ticketGrid.innerHTML = "";

    tickets.forEach(ticket => {

        const button =
            document.createElement("button");

        button.className =
            "ticket-option";

        button.type = "button";

        button.innerHTML = `

            <h3>
                ${ticket.name}
            </h3>

            <strong>
                ${formatNaira(ticket.price)}
            </strong>

            <small>
                ${ticket.description}
            </small>

        `;

        button.addEventListener(
            "click",
            () => selectTicket(ticket.id)
        );

        ticketGrid.appendChild(button);

    });

}


function selectTicket(ticketId) {

  

    const ticket =
        tickets.find(
            item => item.id === ticketId
        );


    state.selectedTicket = ticket;


    document
        .querySelectorAll(".ticket-option")
        .forEach(button => {

            button.classList.remove("selected");

        });


    const selectedButton =
        document.querySelector(
            `[data-ticket="${ticketId}"]`
        );

    const buttons =
        document.querySelectorAll(".ticket-option");

    buttons.forEach(button => {

        if (
            button.querySelector("h3").textContent
            === ticket.name
        ) {

            button.classList.add("selected");

        }

    });


   
    continueBtn.disabled = false;

}


continueBtn.addEventListener(
    "click",
    () => {

        if (!state.selectedTicket) {
            return;
        }


        ticketStep.classList.add("hidden");


        detailsStep.classList.remove("hidden");

        document.querySelector("#stepNumber")
            .textContent = "2";

        document.querySelector("#stepTitle")
            .textContent = "Attendee Details";


        document.querySelector("#progressBar")
            .style.width = "100%";


        document.querySelector(
            "#selectedTicketLabel"
        ).textContent =
            `${state.selectedTicket.name} · ${formatNaira(state.selectedTicket.price)}`;

    }
);


backBtn.addEventListener(
    "click",
    () => {

        detailsStep.classList.add("hidden");

        ticketStep.classList.remove("hidden");

        document.querySelector("#stepNumber")
            .textContent = "1";

        document.querySelector("#stepTitle")
            .textContent = "Select your ticket";

        document.querySelector("#progressBar")
            .style.width = "50%";

    }
);


uploadTrigger.addEventListener(
    "click",
    () => {

        avatarInput.click();

    }
);


avatarInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            formError.textContent =
                "Please select an image.";

            return;

        }

        if (file.size > 5 * 1024 * 1024) {

            formError.textContent =
                "Image must be smaller than 5MB.";

            return;

        }


        const reader =
            new FileReader();


        reader.onload = function () {

            state.profileImage =
                reader.result;


            avatarPreview.innerHTML = `

                <img
                    src="${state.profileImage}"
                    alt="Profile preview"
                >

            `;


            uploadText.textContent =
                file.name;

        };


        reader.readAsDataURL(file);

    }
);


function createTicketId() {

    const random =
        Math.floor(
            Math.random() * 900 + 100
        );

    return `TKT-${Date.now()}-${random}`;

}

function generateBarcode(ticketId) {

    const barcode =
        document.querySelector("#barcode");

    barcode.innerHTML = "";

    for (let i = 0; i < 70; i++) {

        const bar =
            document.createElement("span");

        bar.className = "bar";


        const width =
            Math.floor(
                Math.random() * 4
            ) + 1;


        bar.style.width =
            `${width}px`;


        barcode.appendChild(bar);

    }


    document.querySelector("#barcodeText")
        .textContent = ticketId;

}


bookingForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        formError.textContent = "";


        const name =
            document.querySelector("#name")
                .value
                .trim();

        const email =
            document.querySelector("#email")
                .value
                .trim();

        const specialRequest =
            document.querySelector("#specialRequest")
                .value
                .trim();

        if (!name) {

            formError.textContent =
                "Please enter your name.";

            return;

        }

        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            formError.textContent =
                "Please enter a valid email.";

            return;

        }

        const ticketId =
            createTicketId();
        const booking = {

            ticketId: ticketId,

            name: name,

            email: email,

            specialRequest:
                specialRequest || "None",

            ticketType:
                state.selectedTicket.id,

            ticketName:
                state.selectedTicket.name,

            amount:
                state.selectedTicket.price,

            currency: "NGN",

            profileImage:
                state.profileImage,

            eventName:
                "Techember Fest '25",

            eventLocation:
                "04 Grounds, Lagos, Nigeria",

            eventDate:
                "March 11, 2025 · 7:00 PM"

        };
        state.booking = booking;


  
        showTicket(booking);

    }
);


function showTicket(booking) {



    detailsStep.classList.add("hidden");


    successStep.classList.remove("hidden");

    document.querySelector("#stepNumber")
        .textContent = "✓";

    document.querySelector("#stepTitle")
        .textContent = "Ticket Ready";


   

    document.querySelector("#resultName")
        .textContent = booking.name;

    document.querySelector("#resultType")
        .textContent = booking.ticketName;

    document.querySelector("#resultId")
        .textContent = booking.ticketId;

    document.querySelector("#resultRequest")
        .textContent = booking.specialRequest;


    const ticketAvatar =
        document.querySelector("#ticketAvatar");


    if (booking.profileImage) {

        ticketAvatar.src =
            booking.profileImage;

    } else {
        ticketAvatar.src =
            createDefaultAvatar();

    }

    generateBarcode(
        booking.ticketId
    );



    localStorage.setItem(
        "lastBooking",
        JSON.stringify(booking)
    );

}


function createDefaultAvatar() {

    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300">

            <rect
                width="100%"
                height="100%"
                fill="#0b79a0"
            />

            <circle
                cx="150"
                cy="105"
                r="55"
                fill="#071b38"
            />

            <path
                d="M50 280
                   C60 210
                   100 175
                   150 175
                   C200 175
                   240 210
                   250 280"
                fill="#071b38"
            />

        </svg>

    `;


    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

}

document.querySelector(
    "#bookAnotherBtn"
).addEventListener(
    "click",
    () => {

  

        state.selectedTicket = null;

        state.profileImage = "";

        state.booking = null;


        bookingForm.reset();


        avatarPreview.textContent = "☁";

        uploadText.textContent =
            "Drag & drop or click to upload";


        successStep.classList.add("hidden");

        detailsStep.classList.add("hidden");

        ticketStep.classList.remove("hidden");


        continueBtn.disabled = true;


        document.querySelector(
            "#stepNumber"
        ).textContent = "1";


        document.querySelector(
            "#stepTitle"
        ).textContent = "Select your ticket";


        document.querySelector(
            "#progressBar"
        ).style.width = "50%";

    }
);


document.querySelector(
    "#downloadBtn"
).addEventListener(
    "click",
    () => {

        window.print();

    }
);


document.querySelector(
    "#myTicketsBtn"
).addEventListener(
    "click",
    () => {

        const savedTicket =
            localStorage.getItem(
                "lastBooking"
            );


        if (!savedTicket) {

            alert(
                "You don't have a ticket saved on this browser yet."
            );

            return;

        }


        const booking =
            JSON.parse(savedTicket);


        state.booking = booking;


        showTicket(booking);

    }
);


displayTickets();e