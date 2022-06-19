db.people.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ebfb"),
        "nickname" : "Олег",
        "password" : "$2b$05$5QnU/bkTpunjR9HTbuhtxuHI/bC4x5g0qlaPm37l1qQSkZfxBeiLC"
});
db.people.insert(
    {
        "_id": ObjectId("62a891fc53893fb6b920ebfc"),
        "nickname": "Вася",
        "password": "$2b$05$6p//8/gCgut8P9Oge9yQn.7UYVmpiy2MwlB3jv2HWT6BTmm70/4VS"
});
db.people.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ebfd"),
        "nickname" : "Катя",
        "password" : "$2b$05$wYKtsJ2Aic3LrihjYloSOOdVTcduytfOAXeyCBF8imWcRYLUiEoYi"
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec01"),
        "name" : "Хиты 2022",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec02"),
        "name" : "Все части Шрека",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec03"),
        "name" : "Лекции по программированию",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec07"),
        "name" : "Лучшие песни Лепса",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec08"),
        "name" : "Властенин колец все части",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec09"),
        "name" : "Смешарики",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec0f"),
        "name" : "Хиты 2020",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec10"),
        "name" : "Лекции по квантовой физике",
});
db.disks.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec11"),
        "name" : "Лучшие песни лета 2017",
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec11"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfd"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfd"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec01"),
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec15"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfd"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfd"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec02"),
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec17"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfd"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfd"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec03"),
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec19"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfc"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfc"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec07"),
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec1b"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfc"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfc"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec08"),
});

db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec1d"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfc"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfc"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec09"),
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec1f"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfb"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfb"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec0f"),
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec21"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfb"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfb"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec10"),
});
db.takenitems.insert(
    {
        "_id" : ObjectId("62a891fc53893fb6b920ec23"),
        "ownerId" : ObjectId("62a891fc53893fb6b920ebfb"),
        "holderId" : ObjectId("62a891fc53893fb6b920ebfb"),
        "diskId" : ObjectId("62a891fc53893fb6b920ec11"),
});












