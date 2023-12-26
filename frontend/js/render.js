const colorUser = {
	'#A3C1AD': ['а', 'б', 'в', 'a', 'b', 'c'],
	'#50C878': ['г', 'д', 'е', 'd', 'e', 'f'],
	'#0076CE': ['ё', 'ж', 'з', 'g', 'h', 'i'],
	'#99FFFF': ['и', 'й', 'к', 'j', 'k', 'l'],
	'#6B8E23': ['л', 'м', 'н', 'm', 'n', 'o'],
	'#D0F0C0': ['о', 'п', 'р', 'p', 'q', 'r'],
	'#F0E68C': ['с', 'т', 'у', 's', 't', 'u'],
	'#F88379': ['ф', 'х', 'ц', 'v', 'w', 'x'],
	'#DB7093': ['ч', 'ш', 'щ', 'y',],
	'#E6E6FA': ['ы', 'э', 'я', 'z',],
};


const renderHTML = (user) => {
	return `<div class="users-data-items-item" id="${user._id}">${user.surname + ' ' + user.name + ' ' + user.patronymic}
                        <div class="users-data-items-item__trash">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </div>
                    </div>`;
};

const renderCardHTML = (user) => {
	// let logoURL = user.photo || "../img/icons/person.svg"
	const firstCharacter = user.name[0];

	const [colorKey] = Object.entries(colorUser).find(([_, value]) => {
		return value.includes(firstCharacter.toLowerCase());
	});

	return `<div class="popup-card__photo" style="background-color: ${colorKey || '#E6E6FA'}">${firstCharacter}</div>
        <p class="popup-card__FIO">${user.surname + ' ' + user.name}<br> ${user.patronymic}</p>
        <div class="popup-card-details">
            <label for="age">Возраст:</label>
            <input disabled id="age" class="popup-card-details-item" placeholder="${user.age}">
            <label for="address">Адрес:</label>
            <input disabled id="address" class="popup-card-details-item" placeholder="${user.address}">
            <label for="post">Должность:</label>
            <input disabled id="post" class="popup-card-details-item" placeholder="${user.post}">
        </div>
        <div class="popup-card-btns">
            <button id="${user._id}" class="popup-card-btns__refactor">Редактировать</button>
            <button id="${user._id}" class="popup-card-btns__delete">Удалить</button>
        </div>`;
};

const renderRefactorCardHTML = (user) => {
	const firstCharacter = user.name[0];

	const [colorKey] = Object.entries(colorUser).find(([_, value]) => {
		return value.includes(firstCharacter.toLowerCase());
	});
	return `<div class="popup-card__photo" style="background-color: ${colorKey || '#E6E6FA'}">${firstCharacter}</div>
        <div class="popup-card-details">
        	<label for="surname">Фамилия:</label>
            <input id="surname" class="popup-card-details-item" placeholder="${user.surname}" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="name">Имя:</label>
            <input id="name" class="popup-card-details-item" placeholder="${user.name}" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="patronymic">Отчетсво:</label>
            <input id="patronymic" class="popup-card-details-item" placeholder="${user.patronymic}" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="age">Возраст:</label>
            <input id="age" class="popup-card-details-item" placeholder="${user.age}">
            <label for="address">Адрес:</label>
            <input id="address" class="popup-card-details-item" placeholder="${user.address}">
            <label for="post">Должность:</label>
            <input id="post" class="popup-card-details-item" placeholder="${user.post}">
        </div>
        <div class="popup-card-btns">
        	<button class="popup-card-btns__save">Сохранить</button>
            <button class="popup-card-btns__cansel">Отмена</button>
        </div>`;
};

const renderNewCardHTML = () => {
	return `<h3 style="font-size: 30px">Добавление нового пользователя</h3>
		<div class="popup-card-details">
        	<label for="surname">Фамилия:</label>
            <input id="surname" class="popup-card-details-item" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="name">Имя:</label>
            <input id="name" class="popup-card-details-item" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="patronymic">Отчетсво:</label>
            <input id="patronymic" class="popup-card-details-item" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="age">Возраст:</label>
            <input id="age" class="popup-card-details-item">
            <label for="address">Адрес:</label>
            <input id="address" class="popup-card-details-item">
            <label for="post">Должность:</label>
            <input id="post" class="popup-card-details-item">
        </div>
        <div class="popup-card-btns">
        	<button class="popup-card-btns__save">Сохранить</button>
            <button class="popup-card-btns__cansel">Отмена</button>
        </div>`;
};

export {renderCardHTML, renderHTML, renderRefactorCardHTML, renderNewCardHTML};