//Nhiệm vụ chứa controller của route home
//[GET] /
module.exports.index = (req, res) => {
    res.render('./client/pages/home/index.pug', {
        title: 'Hey',
        message: 'Trang chủ'
    });
}