// pages/api/metadata.js
export default function handler(req, res) {
    if (req.method === 'GET') {

      const metadata = [
      //  {
      //     Pageid : 1,
      //     PageRoute : "Enquiry",
      //     PageName : "Enquiry Form",
      //     PageDesc : "Enquiry Form for Placing order",
      //     css : "#EEE",
      //     Form : [
      //       {
      //         label: 'First Name',
      //         name: 'name',
      //         type: 'text',
      //         required: true,
      //         minLength: 3,
      //         maxLength: 50,
      //       },
      //       {
      //         label: 'Description',
      //         name: 'description',
      //         type: 'textarea',
      //         required: true,
      //         minLength: 10,
      //         maxLength: 200,
      //       },
      //       {
      //         label: 'Category',
      //         name: 'category',
      //         type: 'dropdown',
      //         options: ['Option 1', 'Option 2', 'Option 3'],
      //       },
      //       {
      //         label: 'Date',
      //         name: 'date',
      //         type: 'date',
      //         required: true,
      //       },
      //       {
      //         label: 'Select Multiple',
      //         name: 'multiselect',
      //         type: 'multiselect',
      //         options: ['Option A', 'Option B', 'Option C'],
      //       },
      //     ]
      //   },   
      //   // {
      //   //   Pageid : 2,
      //   //   PageRoute : "OLDOrder",
      //   //   PageName : "old Order Form",
      //   //   PageDesc : "Order Form for Placing order",
      //   //   css : "#EEE",
      //   //   Form : [
      //   //     {
      //   //       label: 'Select Products',
      //   //       name: 'product',
      //   //       type: 'dropdown',
      //   //       options: ['Product A', 'Product B', 'Product C', 'Product D'],
      //   //     },
      //   //     {
      //   //       label: 'Qty',
      //   //       name: 'name',
      //   //       type: 'text',
      //   //       required: true,
      //   //       minLength: 1,
      //   //       maxLength: 1,
      //   //     },
      //   //     {
      //   //       label: 'Delivery Date',
      //   //       name: 'date',
      //   //       type: 'date',
      //   //       required: true,
      //   //     },

      //   //   ]
      //   // },
      //   {
      //     Pageid : 3,
      //     PageRoute : "New form",
      //     PageName : "New form",
      //     PageDesc : "New form for Placing order details",
      //     css : "#EEE",
      //     Form : [
      //       {
      //         label: 'Select Products',
      //         name: 'product',
      //         type: 'dropdown',
      //         options: ['Product A', 'Product B', 'Product C', 'Product D'],
      //       },
      //       {
      //         label: 'Qty',
      //         name: 'name',
      //         type: 'text',
      //         required: true,
      //         minLength: 1,
      //         maxLength: 1,
      //       },
      //       {
      //         label: 'Delivery Date',
      //         name: 'date',
      //         type: 'date',
      //         required: true,
      //       },
      //       {
      //         label: 'Order Details',
      //         name: 'orderDetails',
      //         type: 'form',
      //         required: true,
      //         // order_details:[{"productname":"","quantity":""}]
      //       },  
      //     ]
      //   },
        {
          Pageid : 4,
          PageRoute : "Order",
          PageName : "Order Form",
          PageDesc : "Order Form for Placing order",
          Form : [
            {
                formid :1,
                formname : "orderform",
                fields :  [
                      {
                        controlid : 2,
                        label: 'Customer No',
                        name: 'customernp',
                        type: 'text',
                        required: true,
                        minLength: 1,
                        maxLength: 5,
                      },
                      {
                          controlid : 3,
                          label: 'Customer Name',
                          name: 'customername',
                          type: 'text',
                          required: true,
                          minLength: 1,
                          maxLength: 20,
                        },
                       {
                        controlid : 4,
                        label: 'Order Due Date',
                        name: 'date',
                        type: 'date',
                        required: true,
                      },
                      {
                        controlid : 5,
                        label: 'Order Detail',
                        name: 'orderdetail',
                        type: 'form',
                        formid : 2,
                        formname : "orderdetail",
                        fields :  
                        [
                            {
                            controlid : 1,
                            label: 'Select Products',
                            name: 'product',
                            type: 'dropdown',
                            options: ['Product A', 'Product B', 'Product C', 'Product D']
                            },
                            {
                            controlid : 2,
                            label: 'Order Qty',
                            name: 'orderqty',
                            type: 'text',
                            required: true,
                            minLength: 1,
                            maxLength: 1,
                            },
                            {
                            controlid : 3,
                            label: 'Unit Price',
                            name: 'unitprice',
                            type: 'text',
                            required: true,
                            minLength: 1,
                            maxLength: 1,
                            },
                            {
                            controlid : 4,
                            label: 'Extended Price',
                            name: 'entendedprice',
                            type: 'date',
                            required: true,
                            }
                        ]
                        }
                ]          
            }
          ]
        }

      ];

      // Access query parameters from the request
      const { filterParam } = req.query;
      filterParam == null ? res.status(200).json(metadata) : filterParam;
      // Filter the data based on the query parameter
      const filteredData = metadata.filter((i) => {
        return i.PageRoute.toLowerCase().includes(filterParam.toLowerCase());
      });
      res.status(200).json(filteredData);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  