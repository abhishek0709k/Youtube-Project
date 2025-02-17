        const socket = io()
        const messageInput = document.getElementById('message')
        const sendMessage = document.getElementById('send-message')
        const showAllMessages = document.getElementById('main-body')
        const all_btn_files = document.querySelectorAll('.nav-btn')
        const second_nav_btn = document.getElementById('sec-nav-btn')
        const signup_btn = document.getElementById('Signup-btn')
        const currentOpen = document.getElementById('current-open')
        const Chat_btn = document.getElementById('Chat-btn')
        const house_btn = document.getElementById('Home-page-btn')
        const application_btn = document.getElementById('Application-btn')
        const lists_btn = document.getElementById('Lists-btn')
        socket.on("message" , (message)=>{
            const p = document.createElement("p");
            p.innerText = message;
            p.className = "body-para";
            showAllMessages.appendChild(p)
        })

        sendMessage.addEventListener('click' , (e)=>{
            const message = messageInput.value;
            socket.emit("userMessage" , message)
        })
        document.addEventListener('keydown' , (e)=>{
            if(e.key === 'Enter'){
            const message = messageInput.value;
            socket.emit("userMessage" , message)
            }
        })
        all_btn_files.forEach((all_btn_file)=>{
            all_btn_file.addEventListener('click' , ()=>{
                all_btn_files.forEach((f)=>{
                    f.style.backgroundColor = ''
                })
                all_btn_file.style.backgroundColor = "#0d6efd"
                const id = all_btn_file.id.split('-btn')[0]
                currentOpen.innerText = id;
            })
        })
        second_nav_btn.addEventListener('click' , ()=>{
            second_nav_btn.parentElement.style.display = 'none'
        })
        signup_btn.addEventListener('click' , (e)=>{
            window.location.href = '/signup'
        })

        Chat_btn.addEventListener('click' , ()=>{
            window.location.href = '/chat'
        })
        house_btn.addEventListener('click' , ()=>{
            window.location.href = '/'
        })
        application_btn.addEventListener('click' , ()=>{
            window.location.href = '/application-info'
        })
        lists_btn.addEventListener('click' , ()=>{
            window.location.href = '/AboutMe'
        })


       
       



        
