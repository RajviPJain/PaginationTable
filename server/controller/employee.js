const db=require('../models/database_connection')

const { Op } = require("sequelize");
var Employee=db.employee


const getEmployees=async(req,res)=>{
    try{
         const search=req.query.search || ''
         const skip=req.query.page
        //  console.log(req.query.sort)
        const sort=req.query.sort || [['firstname','ASC']]  

         const employees = await Employee.findAndCountAll({
            attributes: [
                'id',
                
                [db.Sequelize.fn('CONCAT', db.Sequelize.col('firstName'), ' ', db.Sequelize.col('lastName')), 'fullName'],
                'email',
                'empId',
                'department',
                'designation',
                'projectCount',
                'joiningDate',
            
               
                
              ],
              where: {
                [Op.or]:[
               { firstname:{
                [Op.like]: `%${search}%`
                }}, 
                {lastname:{
                    [Op.like]: `%${search}%`
                }}, 
                {email:{
                    [Op.like]: `%${search}%`}}, 
                {empId:{
                    [Op.like]: `%${search}%`
                }}, 
                {department:{
                    [Op.like]: `%${search}%`
                }}, 
                {designation:{
                    [Op.like]: `%${search}%`
                }}, 
                {projectCount:{
                    [Op.like]: `%${search}%`
                }},   
                {joiningDate:{
                    [Op.like]: `%${search}%`
                }}, 
                
            ]
              },
            limit:10,
            offset:skip?(skip-1)*10:0,
            order:[
                ...sort
            ]
        })
        res.send(employees)
    }
    catch(e){
        console.log(e)
          res.send('Not found')
    }
}


module.exports={getEmployees,
}