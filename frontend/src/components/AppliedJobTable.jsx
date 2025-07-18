import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <Table className="min-w-full bg-white text-sm">
        <TableCaption className="text-gray-500 font-medium py-4">
          Your Applied Jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <TableHead className="px-4 py-2">Date</TableHead>
            <TableHead className="px-4 py-2">Job Title</TableHead>
            <TableHead className="px-4 py-2">Company</TableHead>
            <TableHead className="px-4 py-2">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[1, 2].map((item, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableCell className="px-4 py-3 font-medium text-gray-700">
                07-07-2025
              </TableCell>
              <TableCell className="px-4 py-3">Frontend Developer</TableCell>
              <TableCell className="px-4 py-3">Google</TableCell>
              <TableCell className="px-4 py-3">
                <Badge className="bg-green-100 text-green-700 border border-green-300">
                  Selected
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
