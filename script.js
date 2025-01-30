document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formMessage = document.getElementById('formMessage');
    const submitButton = e.target.querySelector('button[type="submit"]');

    // ボタンを無効化
    submitButton.disabled = true;
    submitButton.textContent = '送信中...';

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        const result = await response.json();

        if (result.success) {
            formMessage.textContent = 'お問い合わせを送信しました。';
            formMessage.className = 'form-message success';
            e.target.reset();
        } else {
            throw new Error(result.error || 'エラーが発生しました');
        }
    } catch (error) {
        formMessage.textContent = error.message;
        formMessage.className = 'form-message error';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
    }
}); 