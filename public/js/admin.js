const deleteProduct = (btn) => {
    const productId = btn.parentNode.querySelector('input[name="productId"]').value;
    const csrfToken = btn.parentNode.querySelector('input[name="_csrf"]').value;

    const productElement = btn.closest('article');

    fetch(`/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': csrfToken,
        }
    })
        .then(res => {
            return res.json();
        })
        .then(() => {
            productElement.remove();
        })
        .catch(err => {
            console.log(err);
        });
}