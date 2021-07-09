const tab = document.querySelectorAll.bind(document)('.tab-item');
const panes = document.querySelectorAll.bind(document)('.tab-pane');
const tabActive = $(".tab-item.active");
const line = document.querySelector.bind(document)(".tabs .line");
line.style.left = tabActive.offsetLeft + 'px';
line.style.width = tabActive.offsetWidth + 'px';
tab.forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick = function () {
        document.querySelector.bind(document)('.tab-item.active').classList.remove('active');
        document.querySelector.bind(document)('.tab-pane.active').classList.remove('active');
        this.classList.add('active');
        pane.classList.add('active');
        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';
    }
});