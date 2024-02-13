exports.getAllReports = async (req, res) => {
    try {
        res.status(200).json({ reports: "All reports" });
    } catch (error) {
        console.log(error);
    }
}