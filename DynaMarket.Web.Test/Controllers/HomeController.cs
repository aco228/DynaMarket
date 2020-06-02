using DynaMarket.Socket;
using DynaMarket.Web.Test.Code.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DynaMarket.Web.Test.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Test()
		{

			DataHub.Current.Update("update", new { test = "aco" });
			return this.Content("ok");
		}
	}
}