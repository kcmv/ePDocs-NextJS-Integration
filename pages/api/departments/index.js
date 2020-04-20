const DepartmentController = require('../../../controllers/departments');

export default async (req, res) => {
  if (req.method === 'GET') {
    const result = await DepartmentController.getDepartments();
    if (!result) {
      res.status(404).send('Departments not found');
    }
    res.status(200).json(result);
  }
  if (req.method === 'POST') {
    const depts = await DepartmentController.getDepartments();
    const { department_name } = req.body;

    if (!depts) {
      console.log('No Departments yet');
    }

    if (depts.count > 0) {
      const dept_id = depts.rows[0].uuid;
      const isDeptExists =
        depts.rows[0].department_name.split(',').indexOf(`${department_name}`) >
        -1;
      if (isDeptExists) {
        res.status(403).send('Department already exists');
      }
      const dept_arr = depts.rows[0].department_name.split(',');
      dept_arr.push(department_name);
      const new_dept = dept_arr.join(',');
      const result = await DepartmentController.updateDepartments(
        dept_id,
        new_dept
      );
      res.status(200).json(result);
    } else {
      const new_dept = await DepartmentController.createDepartments(
        department_name
      );
      res.status(200).json(new_dept);
    }
  }
  if (req.method === 'DELETE') {
    const result = await DepartmentController.deleteDepartments(req.body.id);
    if (!result) {
      res.status(403).json(result);
    }
    res.status(200).json(result);
  }
};
