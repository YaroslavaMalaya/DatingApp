document.addEventListener('DOMContentLoaded', function() {
    const userContainers = document.querySelectorAll('.user-container');
    let currentIndex = 0;

    function initialDisplay() {
        userContainers.forEach((container, index) => {
            if (index < 3) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    }

    function updateCarousel() {
        userContainers.forEach(container => container.style.display = 'none');
        let prevIndex = (currentIndex - 1 + userContainers.length) % userContainers.length;
        let nextIndex = (currentIndex + 1) % userContainers.length;

        [prevIndex, currentIndex, nextIndex].forEach((index) => {
            const container = userContainers[index];
            container.style.display = 'block';
            container.classList.remove('active', 'left', 'right');
            if(index === currentIndex) {
                container.classList.add('active');
            } else if (index === prevIndex) {
                container.classList.add('left');
            } else if (index === nextIndex) {
                container.classList.add('right');
            }
        });
    }

    initialDisplay();

    document.querySelectorAll('.like-button, .dislike-button').forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % userContainers.length;
            updateCarousel();
        });
    });


    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const targetUserId = this.getAttribute('data-user-id');
            fetch('/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ targetUserId }),
            })
                .then(response => response.json())
                .then(data => console.log(data.message))
                .catch(error => console.error('Error liking user:', error));
        });
    });

    document.querySelectorAll('.dislike-button').forEach(button => {
        button.addEventListener('click', function() {
            const targetUserId = this.getAttribute('data-user-id');
            fetch('/dislike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ targetUserId }),
            })
                .then(response => response.json())
                .then(data => console.log(data.message))
                .catch(error => console.error('Error disliking user:', error));
        });
    });

    document.querySelectorAll('.remove-chat-button').forEach(button => {
        button.addEventListener('click', function() {
            const userIdToRemove = this.dataset.userId;
            fetch('/remove-match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userIdToRemove }),
            })
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        this.closest('.matched-user-container').remove();
                    } else {
                        console.error('Failed to remove match:', data.message);
                    }
                })
                .catch(error => console.error('Error removing match:', error));
        });
    });
});
