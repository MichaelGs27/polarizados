const db = require('../config/db.config');

exports.getAllappointments = async () => {
    const [rows] = await db.execute('SELECT * FROM appointments');
    return rows;
};

exports.getappointmentsById = async (idAppointment) => {
    const [rows] = await db.execute('SELECT * FROM appointments WHERE idAppointment = ?', [idAppointment]);
    return rows[0];
};

exports.createappointments = async (newappointment) => {
    const [result] = await db.execute(
        'INSERT INTO appointments (idServiceType, appointmentDate, status, documentDescription, idUser, idService, observations, idVehicleType, idVehicle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [newappointment.idServiceType, newappointment.appointmentDate, newappointment.status, newappointment.documentDescription, newappointment.idUser, newappointment.idService, newappointment.observations, newappointment.idVehicleType, newappointment.idVehicle]
    );
    return { idAppointment: result.insertId, ...newappointment };
};

exports.updateappointments = async (idAppointment, updatedappointment) => {
    const [result] = await db.execute(
        'UPDATE appointments SET idVehicleTypeType = ?, appointmentDate = ? , status = ?, documentDescription = ?, idUser = ?, idService, observations, idVehicleType = ?, idVehicle = ? WHERE idAppointment = ?',
        [updatedappointment.idVehicleTypeType, updatedappointment.appointmentDate, updatedappointment.status, updatedappointment.documentDescription, updatedappointment.idUser, updatedappointment.idService, updatedappointment.observations, updatedappointment.idVehicleType, updatedappointment.idVehicle, idAppointment]
    );
    return result.affectedRows > 0;
};

exports.deleteappointments = async (idAppointment) => {
    const [result] = await db.execute('DELETE FROM appointments WHERE idAppointment = ?', [idAppointment]);
    return result.affectedRows > 0;
};