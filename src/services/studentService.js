import Student from "../models/studentModel.js"

const createNew = async (reqBody) => {
  try {
    const newStudent = await Student.create({ ...reqBody })
    return newStudent
  } catch (error) {
    throw error
  }
}
const getStudents = async (req, res) => {
  try {
    const { filter, search, page, pageSize: pageSizeR } = req.query;
    const pageSize = Number(pageSizeR)
    const skip = (page - 1) * pageSize;

    let matchStage = {};

    // Xử lý filter
    if (filter && filter !== '0') {
      const filterRanges = {
        '1': { min: 8, max: 10 },    // Giỏi
        '2': { min: 6.5, max: 8 },   // Khá
        '3': { min: 5, max: 6.5 },   // Trung bình
        '4': { min: 3.5, max: 5 },   // Yếu
        '5': { min: 0, max: 3.5 }    // Kém
      };

      const range = filterRanges[filter];
      if (range) {
        matchStage.averageScore = { $gte: range.min, $lt: range.max };
      }
    }
    if (search) {
      matchStage.name = { $regex: search, $options: 'i' };
    }

    const aggregationPipeline = [
      {
        $addFields: {
          averageScore: {
            $round: [
              { $avg: ["$mathScore", "$literatureScore", "$englishScore"] },
              2
            ]
          }
        }
      },
      {
        $addFields: {
          classification: {
            $switch: {
              branches: [
                { case: { $gte: ["$averageScore", 8] }, then: "Giỏi" },
                { case: { $gte: ["$averageScore", 6.5] }, then: "Khá" },
                { case: { $gte: ["$averageScore", 5] }, then: "Trung bình" },
                { case: { $gte: ["$averageScore", 3.5] }, then: "Yếu" },
              ],
              default: "Kém"
            }
          }
        }
      },
      { $match: matchStage },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: Number(page) } }],
          data: [{ $skip: skip }, { $limit: pageSize }]
        }
      }
    ];

    const result = await Student.aggregate(aggregationPipeline);

    const students = result[0].data;
    const metadata = result[0].metadata[0];
    const totalPages = metadata ? Math.ceil(metadata.total / pageSize) : 0;
    return {
      students,
      currentPage: Number(page),
      totalPages,
      totalStudents: metadata ? metadata.total : 0
    };

  } catch (error) {
    throw error
    // res.status(500).json({ message: error.message });
  }
};

const update = async (studentId, reqBody) => {
  console.log('🚀 ~ update ~ studentId, reqBody:', studentId, reqBody)
  try {
    const updateStudent = await Student.findByIdAndUpdate(studentId, { ...reqBody }, { new: true })
  } catch (error) {
    throw error
  }
}

const deleteItem = async (studentId) => {
  try {
    const deleteItem = await Student.findByIdAndDelete(studentId)
  } catch (error) {
    throw error
  }
}

export const studentService = {
  createNew,
  update,
  deleteItem,
  getStudents
}