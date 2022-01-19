const dbService = require('../db/db.service');

// Middlewear for authenticate members for the service
const authMember = async (req, res, next) => {

    if (res.locals && res.locals.account && res.locals.account.id && res.locals.account.id > 0) {
        try {            
            const hirarchyMember = await getChildFromParentId(res.locals.account.id);            
            if(req.params.id == res.locals.account.id || req.params.id == hirarchyMember.memberId) {
                next();
            } else {
                console.error('Access Denied, you are not allowd to access to the requested member');
                res.status('401').json({
                    success: false, 
                    message: 'Access Denied, you are not allowd to access to the requested member'
                });
            }            
            
        } catch (err) {
            console.error('Not Authorized, the member was not found in db: ', err);
            res.status('401').json({
                success: false, 
                message: 'Not Authorized, please sign up to the service'
            });
        }
    } else {
        res.status('401').json({
            success: false, 
            message: 'Not Authorized, please sign up to the service'
        });
    }
};

// Get the child of the requested memeber by id
const getChildFromParentId = async(id) => {
    const hirarchyMember = await dbService.getHierarchyMemberItemByParentId(id); 
    return hirarchyMember;
};


module.exports = {
    authMember
}